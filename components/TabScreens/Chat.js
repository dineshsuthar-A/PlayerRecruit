import { View, Text, ScrollView, TextInput, Dimensions, TouchableOpacity, StatusBar, Image, BackHandler } from 'react-native'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get("window").width;
import { Ionicons } from '@expo/vector-icons';
import { GiftedChat, InputToolbar, Send, Composer } from 'react-native-gifted-chat'
import { baseURL } from '../../config';
import { db } from '../../Firebase';
import { collection, addDoc, doc, setDoc, updateDoc, serverTimestamp, query, orderBy, onSnapshot, limit, getDoc, startAfter, getDocs, startAt, endAt, where } from 'firebase/firestore';
import { async } from '@firebase/util';



export default function Chat({ route, navigation }) {
  const userid = route?.params?.userid?.registration_id;
  const rid = route?.params?.receiver?.registration_id;
  const [messages, setMessages] = useState([]);
  const [txtbox, settxtbox] = useState();
  const [offset, setoffset] = useState();
  const gifchat = useRef();
  const [unsub, setunsub] = useState();
  const docid = route.params.userid.registration_id > route?.params.receiver.registration_id ? route?.params?.userid?.registration_id + "-" + route?.params?.receiver?.registration_id : route?.params.receiver.registration_id + "-" + route.params.userid.registration_id;

  const getmessages = async (q) => {
    const documentSnapshots = await getDocs(q);
    setoffset(documentSnapshots.docs[documentSnapshots.docs.length - 1]);

  }
  useEffect(() => {
    const q = query(collection(db, "chat/" + docid + "/messages"), orderBy("createdAt", "desc"), limit(40));
    getmessages(q);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const message = [];
      querySnapshot?.forEach((doc) => {
        message.push({ ...doc?.data(), "createdAt": doc?.data()?.createdAt?.toDate() ? doc?.data()?.createdAt?.toDate() : new Date() });
      });
      setMessages(message);
      setupdate();
    });
    return () => {
      unsubscribe();
    }
  }, [])

  const loadMore = async () => {
    if (offset) {
      const q = query(collection(db, "chat/" + docid + "/messages"), orderBy("createdAt", "desc"), startAfter(offset), limit(20));
      const documentSnapshots = await getDocs(q);
      setoffset(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
      const querySnapshot = await getDocs(q);
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({ ...doc?.data(), "createdAt": doc?.data()?.createdAt?.toDate() ? doc?.data()?.createdAt?.toDate() : new Date() });
      });
      setMessages([...messages, ...data]);
    }
  }
  const setupdate = async () => {
    const docRef = doc(db, "chat/inbox/" + userid + "/" + rid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      setDoc(doc(db, "chat/inbox/" + userid + "/" + rid), { lastseen: serverTimestamp(), "count": 0 });
    } else {
      updateDoc(doc(db, "chat/inbox/" + userid + "/" + rid), { lastseen: serverTimestamp(), "count": 0 });
    }
  }

  const onSend = async (messages) => {
    const mymsg = messages[0];
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    await addDoc(collection(db, "chat/" + docid + "/messages",), { ...mymsg, "createdAt": serverTimestamp() });
    const docRef = doc(db, "chat/inbox/" + userid + "/" + rid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      setDoc(doc(db, "chat/inbox/" + userid + "/" + rid), { lastmessage: { ...mymsg, "createdAt": serverTimestamp() }, "reciever": rid, "count": 0 });
    } else {
      updateDoc(doc(db, "chat/inbox" + "/" + userid + "/" + rid), { lastmessage: { ...mymsg, "createdAt": serverTimestamp() }, "reciever": rid, "count": 0 });
    }
    var count = 0;
    const dcrf = doc(db, "chat/inbox/" + rid + "/" + userid);
    const dcSp = await getDoc(dcrf);
    if (!dcSp.exists()) {
      setDoc(dcrf, { lastmessage: { ...mymsg, "createdAt": serverTimestamp() }, "reciever": userid, "count": count + 1 });
    } else {
      const dat = (dcSp.data().lastseen.toDate());
      const quer = query(collection(db, "chat/" + docid + "/messages"), where("createdAt", ">", dat));
      const qsnapst = await getDocs(quer)
      qsnapst.forEach(doc => {
        count = count + 1
      })
      console.log(count);
      updateDoc(dcrf, { lastmessage: { ...mymsg, "createdAt": serverTimestamp() }, "reciever": userid, "count": (count) });
    }
    const dr = doc(db, "chat/inbox/" + rid + "/" + userid);

  }




  return (
    <View style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: 'white' }}>
      <StatusBar color="#004467" />
      <View style={{ width: '100%', height: windowHeight * 0.09, backgroundColor: '#004467', alignItems: 'center', flexDirection: 'row', paddingHorizontal: 15 }} >
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="chevron-back" size={20} color="white" />
        </TouchableOpacity>
        <Text style={{ fontSize: 17, color: 'white', marginLeft: 20 }}>{route?.params?.receiver?.firstname} {route?.params.receiver.lastname}</Text>
      </View>
      <GiftedChat
        messages={messages}
        ref={gifchat}
        style={{ backgroundColor: 'white' }}
        onSend={messages => {
          onSend(messages);
        }}
        renderChatEmpty={() => {
          return (
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <View style={{ backgroundColor: '#F9FAFC', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 5 }}>
                <Text style={{ transform: [{ rotateX: '180deg' }], fontSize: windowHeight * 0.02, fontWeight: '600' }}> Say Hi </Text>
              </View>
            </View>
          )
        }}
        listViewProps={{
          onEndReachedThreshold: 0.3,
          onEndReached: () => loadMore()
        }}

        user={{
          _id: route?.params?.userid?.registration_id,
          name: route?.params?.userid?.firstname + route?.params?.userid?.lastname,
          avatar: baseURL + "uploads/" + route.params.userid.image,
        }}

        inverted={true}
        renderInputToolbar={(props) => {
          return <InputToolbar {...props} containerStyle={{ height: windowHeight * 0.068, paddingRight: windowWidth * 0.01, display: 'flex', flexDirection: 'row', borderColor: '#E4EBF1', borderTopColor: '#E4EBF1', borderWidth: 1, borderRadius: windowHeight * 0.065, backgroundColor: '#F2EFEF', alignItems: 'center', paddingVertical: 5, paddingLeft: windowWidth * 0.05, marginHorizontal: 10 }} />
        }}

        renderSend={(props) => {
          return <Send {...props} containerStyle={{ height: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} >
            <View style={{ backgroundColor: '#00B8FE', justifyContent: 'center', alignItems: 'center', borderRadius: windowWidth * 0.054, marginLeft: windowWidth * 0.015, height: windowHeight * 0.054, width: windowHeight * 0.054 }}>
              <Feather name="send" size={windowHeight * 0.02} color="white" />
            </View>
          </Send>
        }}

        showUserAvatar={true}
        alwaysShowSend
        renderAvatarOnTop={true}
      // renderInputToolbar={(props) => {
      //   return (
      //     <View style={{ alignItems: 'center', width: '100%', paddingHorizontal: 10, justifyContent: 'center', height: windowHeight * 0.053 }}>
      //       <View style={{ width: '100%', height: 50, display: 'flex', flexDirection: 'row', borderColor: '#E4EBF1', borderWidth: 1, borderRadius: 50, backgroundColor: '#F2EFEF', alignItems: 'center', paddingVertical: 5, paddingLeft: windowWidth * 0.05 }}>
      //         <TextInput value={txtbox} onChangeText={(t) => settxtbox(t)} multiline={true} style={{ width: windowWidth * 0.57 }} placeholder='Enter your message here' selectionColor="#004467"></TextInput>
      //         <TouchableOpacity style={{ borderRadius: windowWidth * 0.056, marginHorizontal: windowWidth * 0.02 }}>
      //           <FontAwesome5 name="smile" size={20} color="#AFBBC6" />
      //         </TouchableOpacity>
      // <TouchableOpacity style={{ borderRadius: windowWidth * 0.056, marginHorizontal: windowWidth * 0.015 }}>
      //   <SimpleLineIcons name="paper-clip" size={20} color="#AFBBC6" />
      // </TouchableOpacity>
      // <TouchableOpacity onPress={() => {
      //   settxtbox("");
      //   onSend({
      //     _id: id,
      //     text: txtbox,
      //     createdAt: new Date(),
      //     user: {

      //       _id: route?.params?.userid?.registration_id,
      //       name: route?.params?.userid?.firstname + route?.params?.userid?.lastname,
      //       avatar: baseURL + "uploads/" + route.params.userid.image,
      //     },
      //   })
      // }} style={{ backgroundColor: '#00B8FE', padding: windowWidth * 0.028, borderRadius: windowWidth * 0.056, marginLeft: windowWidth * 0.015 }}><Feather name="send" size={20} color="white" /></TouchableOpacity>
      //       </View>
      //     </View>
      //   )
      // }}
      />
    </View >
  )
}

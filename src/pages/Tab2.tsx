import {IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToggle, IonToolbar} from '@ionic/react';
import { initializeApp } from "firebase/app";
import { getDatabase,ref ,get,child,set} from "firebase/database";
import React, {useEffect, useState} from "react";

const firebaseConfig = {
   apiKey: "AIzaSyBmxrC_C4QlJs4-JO6Ap5HSp_e98dRxCc8",
  authDomain: "test-24dd8.firebaseapp.com",
  databaseURL: "https://test-24dd8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-24dd8",
  storageBucket: "test-24dd8.appspot.com",
  messagingSenderId: "599038139951",
  appId: "1:599038139951:web:6c0c9c5c9039317304b0da",

};

const app = initializeApp(firebaseConfig);
let data =getDatabase(app)

const Tab2: React.FC = () => {
    let [items, setItems] = useState([]) as any
    let [filter, setFilter] = useState(false)
    useEffect(() => {
      get(child(ref(data),'/')).then(res =>{

          setItems(res.val().date)
      })
    }, []);

    async function  f(index: string) {
        // @ts-ignore
        let newData=items.map((item:any) =>{
            if (item.id===index){
                return{...item,check:!item.check}
            }else {
                return item
            }
        })
        setItems(newData)
        set(ref(data,'/'),{date:newData})
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Кононец Никита РК-4</IonTitle><IonTitle><IonToggle checked={filter} onClick={()=> setFilter(!filter) }>выбранные</IonToggle></IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    {!filter ? items.map((item:any) => {
                        return <IonItem key={item.id}><IonToggle checked={item.check} onClick={()=> f(item.id)} >{item.name}</IonToggle></IonItem>
                    }) : items.filter((pipe:any) =>pipe.check).map((item:any) => {
                        return <IonItem key={item.id}><IonToggle checked={item.check}  onClick={()=> f(item.id)}>{item.name}</IonToggle></IonItem>
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;

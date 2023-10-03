import {
    IonAlert,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonList,
    IonPage,
    IonTitle,
    IonToggle,
    IonToolbar
} from '@ionic/react';
import {initializeApp} from "firebase/app";
import {child, get, getDatabase, ref, set} from "firebase/database";
import React, {useEffect, useState} from "react";

const firebaseConfig = {
   apiKey: "A",
  authDomain: "test-24dd8.firebaseapp.com",
  databaseURL: "htpp",
  projectId: "test-24dd8",
  storageBucket: "tesom",
  messagingSenderId: "599038139951",
  appId: "1:599038139951:web:6c0c9c5c9039317304b0da",

};

const app = initializeApp(firebaseConfig);
let data =getDatabase(app)

const Tab2: React.FC = () => {
    let [items, setItems] = useState([]) as any
    let [filter, setFilter] = useState(false)
    let [alert,setAlert]=useState()
    useEffect(() => {
      get(child(ref(data),'/')).then(res =>{
          setItems(res.val().date)

      })
    }, []);

  async function  searchWiki(target:string) :Promise<string>{
      return await fetch(`https://ru.wikipedia.org/api/rest_v1/page/summary/${encodeURI(target)}`).then(data=>data.json())
  }
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
                        return <IonItem key={item.id}> <IonButton id={item.id} className={'ion-margin'}>Инфо</IonButton><IonAlert trigger={item.id} buttons={['ok']} header={item.name} message={item.info ? item.info:'на википедии нет информации поэтому месту'}/>  <IonToggle checked={item.check} onClick={()=> f(item.id)} >{item.name}</IonToggle></IonItem>
                    }) : items.filter((pipe:any) =>pipe.check).map((item:any) => {
                        return <IonItem key={item.id}> <IonButton id={item.id} className={'ion-margin'}>Инфо</IonButton><IonAlert trigger={item.id} buttons={['ok']} header={item.name} message={item.info ? item.info:'на википедии нет информации поэтому месту'}/>  <IonToggle checked={item.check} onClick={()=> f(item.id)} >{item.name}</IonToggle></IonItem>
                    })}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Tab2;

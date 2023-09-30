import {IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToggle, IonToolbar} from '@ionic/react';
import React, {useEffect, useState} from "react";
import { Storage } from '@ionic/storage';
let data = [
    {
        "id": "6782",
        "check": false,
        "name": "Айет"
    },
    {
        "id": "11071",
        "check": false,
        "name": "Айтеке-Би"

    },
    {
        "id": "2728",
        "check": false,
        "name": "Акколь"

    },
    {
        "id": "150",
        "check": false,
        "name": "Аксай (Казахстан)"

    },
    {
        "id": "6254",
        "check": false,
        "name": "Аксукент"

    },
    {
        "id": "151",
        "check": false,
        "name": "Аксу (Павлодар.обл)"

    },
    {
        "id": "152",
        "check": false,
        "name": "Актау"

    },
    {
        "id": "154",
        "check": false,
        "name": "Актобе"

    },
    {
        "id": "6365",
        "check": false,
        "name": "Актогай"

    },
    {
        "id": "156",
        "check": false,
        "name": "Алга (Актюбинская обл)"

    },
    {
        "id": "160",
        "check": false,
        "name": "Алматы"

    },
    {
        "id": "169",
        "check": false,
        "name": "Алтай (Зыряновск)"

    },
    {
        "id": "158",
        "check": false,
        "name": "Аральск"
    },
    {
        "id": "161",
        "check": false,
        "name": "Аркалык"
    },
    {
        "id": "6300",
        "check": false,
        "name": "Арысь (Туркестанская область)"
    }]

const Tab1: React.FC = () => {
    let [items, setItems] = useState([]) as any
    let [filter, setFilter] = useState(false)
    const store = new Storage();
    store.create()
    async function dataStorage() {


        let st= await store.get('key')
        if(st== undefined){
            await store.set('key', data)
        }else{
            return await store.get('key')
        }
    }
    useEffect(() => {
        dataStorage().then(res=>setItems(res) )
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
    await store.set('key',newData)
}

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Кононец Никита РК-3</IonTitle><IonTitle><IonToggle checked={filter} onClick={()=> setFilter(!filter) }>выбранные</IonToggle></IonTitle>

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

export default Tab1;

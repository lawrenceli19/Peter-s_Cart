<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          <ion-icon :icon="iconTitle" /> Peter's Cart
          <ion-icon :icon="iconTitle"
        /></ion-title>
        <ion-buttons slot="end">
          <ion-button @click="ClearAll">
            <ion-icon :icon="trash"></ion-icon
          ></ion-button>
          <ion-button @click="TriggerSort">
            <ion-icon :icon="filter"></ion-icon
          ></ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" ref="itemList" style="margin-bottom: 2rem">
      <ion-list class="backgroundPg" :class="randomImg">
        <ShoppingItem
          v-for="(item, index) in SortedList"
          :item="item"
          :key="index"
          @updateCheck="UpdateCheckStatus($event)"
          @deleteItem="DeleteItem($event)"
        ></ShoppingItem>
      </ion-list>
    </ion-content>
    <ion-toolbar>
      <ion-item>
        <ion-input
          type="text"
          placeholder="Buy Carrots * 100"
          v-model="itemString"
          @keyup.enter="AddItem"
        ></ion-input>
        <ion-buttons @click="AddItem" color="Secondary"><b>Add</b></ion-buttons>
      </ion-item>
    </ion-toolbar>
  </ion-page>
</template>

<script >
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonTitle,
  IonContent,
  IonItem,
  IonButtons,
  IonInput,
  IonList,
  IonIcon,
} from "@ionic/vue";
import ShoppingItem from "../components/ShoppingItem.vue";
import { ref, computed, onBeforeMount } from "vue";
import { filter, trash } from "ionicons/icons";
import { db } from "../firebase/db.js";
import { alertController } from "@ionic/vue";
import { userInitial } from "../firebase/auth";
export default {
  name: "Tab1",
  components: {
    ShoppingItem,
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonContent,
    IonPage,
    IonItem,
    IonButtons,
    IonInput,
    IonList,
    IonIcon,
  },

  setup: () => {
    const itemString = ref("");
    const items = ref([]);
    const sortType = ref(false);
    const itemList = ref();
    const iconTitle = "assets/icon/carrot.svg";
    const randomImg = ref();

    const ReadFireStore = () => {
      db.collection("lists")
        .doc("cart")
        .onSnapshot((snapshot) => {
          items.value = [...snapshot.get("list")];
        });
    };

    onBeforeMount(() => {
      ReadFireStore();
      randomImg.value = "img" + Math.floor(Math.random() * 14);
      console.log(randomImg.value);
    });

    const AddItem = async () => {
      if (itemString.value.length == 0) {
        return;
      }
      itemString.value = itemString.value.trim();
      //check for duplication
      const checkDuplication = items.value.filter(
        (item) => item.value.toLowerCase() === itemString.value.toLowerCase()
      );
      if (checkDuplication.length > 0) {
        const alert = await alertController.create({
          header: "Alert",
          message: "Duplicated item found",
          buttons: ["Ok"],
        });
        await alert.present();

        itemString.value = "";
        return;
      }

      let itemObj = {
        value: itemString.value,
        checked: false,
        author: userInitial.value,
      };
      //add into list
      items.value.unshift(itemObj);
      SaveToFirebase();
      itemString.value = "";
    };

    const SaveToFirebase = () => {
      var listDoc = db.collection("lists").doc("cart");
      return listDoc
        .update({
          list: items.value,
        })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    };

    const DeleteItem = (itemVal) => {
      //delete by word
      let valueId = items.value.findIndex((item) => item.value == itemVal);
      items.value.splice(valueId, 1);
      SaveToFirebase();
    };

    const ClearAll = async () => {
      const alert = await alertController.create({
        header: "Alert",
        message: "Do you wish to clear all items?",
        buttons: [
          {
            text: "Yes",
            role: "proceed",
            cssClass: "secondary",
            handler: () => {
              items.value = [];
              SaveToFirebase();
            },
          },
          {
            text: "No",
            role: "cancel",
            cssClass: "secondary",
          },
        ],
      });
      await alert.present();
    };

    const UpdateCheckStatus = (val) => {
      let itemVal = val[0];
      let bool = val[1];
      let valueId = items.value.findIndex((item) => item.value == itemVal);
      items.value[valueId].checked = bool;
      SaveToFirebase();
    };

    const TriggerSort = () => {
      if (sortType.value == false) {
        sortType.value = true;
      } else {
        sortType.value = false;
      }
    };

    const SortedList = computed(() => {
      if (sortType.value == true)
        return items.value.filter((item) => item.checked == false);
      else return items.value;
    });

    return {
      AddItem,
      UpdateCheckStatus,
      DeleteItem,
      itemString,
      items,
      itemList,
      sortType,
      TriggerSort,
      ClearAll,
      SortedList,
      filter,
      trash,
      iconTitle,
      userInitial,
      randomImg,
    };
  },
};
</script>

<style scoped>
.backgroundPg {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.img1 {
  background-image: url("../assets/img1.jpg");
}
.img2 {
  background-image: url("../assets/img2.jpg");
}
.img3 {
  background-image: url("../assets/img3.jpg");
}
.img4 {
  background-image: url("../assets/img4.jpg");
}
.img5 {
  background-image: url("../assets/img5.jpg");
}
.img6 {
  background-image: url("../assets/img6.jpg");
}
.img7 {
  background-image: url("../assets/img7.jpg");
}
.img8 {
  background-image: url("../assets/img8.jpg");
}
.img9 {
  background-image: url("../assets/img9.jpg");
}
.img10 {
  background-image: url("../assets/img10.jpg");
}
.img11 {
  background-image: url("../assets/img11.jpg");
}
.img12 {
  background-image: url("../assets/img12.jpg");
}
.img13 {
  background-image: url("../assets/img13.jpg");
}
</style>
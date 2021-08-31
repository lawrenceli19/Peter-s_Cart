<template>
  <ion-item-sliding ref="itemSlide">
    <ion-item>
      <ion-label
        :style="item.checked ? 'text-decoration: line-through;' : ''"
        >{{ item.value }}</ion-label
      >
      <ion-note slot="end"> {{ item.author }} </ion-note>
    </ion-item>

    <ion-item-options side="start">
      <ion-item-option color="danger" @click="DeleteItem">
        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
      </ion-item-option>
    </ion-item-options>

    <ion-item-options side="end">
      <ion-item-option
        v-if="!item.checked"
        @click="CheckItem"
        color="secondary"
      >
        <ion-icon slot="icon-only" :icon="checkmarkCircle"></ion-icon>
      </ion-item-option>

      <ion-item-option v-else @click="CheckItem" color="medium">
        <ion-icon slot="icon-only" :icon="arrowUndoCircle"></ion-icon>
      </ion-item-option>
    </ion-item-options>
  </ion-item-sliding>
</template>

<script >
import {
  IonItem,
  IonLabel,
  IonNote,
  IonItemOptions,
  IonItemOption,
  IonIcon,
  IonItemSliding,
} from "@ionic/vue";
import { ref } from "vue";
import { trash, checkmarkCircle, arrowUndoCircle } from "ionicons/icons";
export default {
  name: "ShoppingItem",
  props: {
    item: {
      type: Object,
      default: () => ({
        value: "Ice Cream",
        checked: false,
        author: "LMC"
      }),
    },
    index: {
      type: Number,
      default: 1,
    },
  },
  components: {
    IonItem,
    IonLabel,
    IonNote,
    IonItemOptions,
    IonItemOption,
    IonIcon,
    IonItemSliding,
  },
  setup: (props, { emit }) => {
    const itemCheck = ref(false);
    const itemSlide = ref();
    const CheckItem = () => {
      if (props.item.checked === false) itemCheck.value = true;
      else itemCheck.value = false;

      emit("updateCheck", [props.index, itemCheck.value]);
      itemSlide.value.$el.close();
    };

    const DeleteItem = () => {
      emit("deleteItem", props.index);
      itemSlide.value.$el.close();
    };

    return {
      CheckItem,
      DeleteItem,
      itemCheck,
      itemSlide,
      trash,
      checkmarkCircle,
      arrowUndoCircle,
    };
  },
  emits: ["updateCheck", "deleteItem"],
};
</script>

<style scoped>
.crosseOut {
  text-decoration: line-through;
}
</style>

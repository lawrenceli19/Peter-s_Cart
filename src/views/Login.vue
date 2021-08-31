<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Peter's Cart </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding background-white">
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col size-md="6" size="12">
            <ion-card style="">
              <ion-card-header class="ion-text-center">
                <ion-card-title><b>Sign In</b></ion-card-title>
              </ion-card-header>
              <ion-card-content style="padding: 2rem">
                <form @submit.prevent="login" class="ion-text-center">
                  <ion-item lines="inset">
                    <ion-label position="stacked">Email</ion-label>
                    <ion-input type="email" v-model="creds.email" />
                  </ion-item>
                  <ion-item lines="inset">
                    <ion-label position="stacked">Password</ion-label>
                    <ion-input type="password" v-model="creds.password" />
                  </ion-item>
                  <ion-button
                    style="width: 80%"
                    type="submit"
                    class="ion-margin-top"
                  >
                    Sign In
                  </ion-button>
                </form>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonItem,
  IonButton,
  IonTitle,
  IonInput,
  IonHeader,
  IonToolbar,
} from "@ionic/vue";
import { watchEffect, reactive, defineComponent } from "vue";
import { user, useLogin } from "../firebase/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonLabel,
    IonItem,
    IonButton,
    IonTitle,
    IonInput,
    IonHeader,
    IonToolbar,
  },
  setup() {
    const router = useRouter();
    const creds = reactive({
      email: "",
      password: "",
    });

    const login = async () => {
      user.value = await useLogin(creds.email, creds.password);
    };

    watchEffect(() => {
      if (user.value) {
        router.push({ name: "Tab1" });
      }
    });

    return { user, creds, login };
  },
});
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
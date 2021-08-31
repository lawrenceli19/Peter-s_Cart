<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/shopping">
          <ion-icon :src="iconTab1" size="large"/>
          <ion-label>Shopping List</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/tab2" disabled>
          <ion-icon :src="iconTab2" size="large"/>
          <ion-label>TBC</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3" disabled>
          <ion-icon :src="iconTab3" size="large"/>
          <ion-label>TBC</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script >
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {

    const iconTab1 = "assets/icon/tab1.svg";
    const iconTab2 = "assets/icon/tab2.svg";
    const iconTab3 = "assets/icon/tab3.svg";

    return {
      iconTab1, 
      iconTab2, 
      iconTab3,
    }
  }
}
</script>
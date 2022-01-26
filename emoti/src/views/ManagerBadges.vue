.<template>
    <div id="backgroundManagerBadges">
     <b-container class="col-11 pt-4">
         <div class="col-12" :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}"><h2>Gerir Badges</h2></div>

         <div class="col-12 mt-4">
              <b-form inline >
                  <label class="mr-sm-2" for="filterTitle">Descrição: </label>
                  <b-form-input id="filterTitle" class="mb-2 mr-sm-5 mb-sm-0 col-3" :style="{'background-color':'#fdfdf3'}"></b-form-input>

                  <label class="mr-sm-2" for="filterLevel">Emoção: </label>
                  <b-form-select id="filterLevel" class="mb-2 mr-sm-0 mb-sm-0 col-2"  :style="{'background-color':'#fdfdf3'}">
                    <b-form-select-option value="">Qualquer</b-form-select-option>
                  </b-form-select>
             </b-form>
         </div>

         <div class="col-12 d-flex flex-row justify-content-end mt-4">
             <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modalManagerBadges @click="modalBadgeDo='addBadge'">Adicionar</b-button>
         </div>

        <div class="col-12 mt-2">
            <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Descrição</th>
                      <th>Emoção</th>
                      <th>Pontos Necessários</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" v-for="(badge,index) in getBagdes" :key="index">
                      <td class="p-4">{{badge.badgeName}}</td>
                      <td>{{badge.badgeEmotion}}</td>
                      <td>{{badge.pointsNedded}}</td>
                      <td><b-button style="border:none" variant="danger" class=" ml-2 mr-1"><b-icon icon="trash-fill"></b-icon></b-button></td>
                  </tr>
             </table>
         </div>
     </b-container>

     <b-modal  id="modalManagerBadges" centered hide-footer header-border-variant="0" header-class="color" body-class="color">
         <!--Adicionar Badge-->
         <div v-if="modalBadgeDo=='addBadge'" :style="{fontFamily:'EAmbit SemiBold'}" class="text-center">
            <h4 :style="{color:'#e87461'}">Adicionar Badge</h4>
             <b-form @submit.prevent="addNewBadge()">
              <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Descrição:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" v-model="newBadgeForm.badgeName" required></b-form-input>
              </b-form-group>

               <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Pontos:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" type="number" min="0" v-model.number="newBadgeForm.pointsNedded" required></b-form-input>
               </b-form-group>

                <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Imagem (URL):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" type="url" v-model="newBadgeForm.badgeIMG" required></b-form-input>
                </b-form-group>

                <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Emoção:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" v-model="newBadgeForm.badgeEmotion">
                       <b-form-select-option value="Total" >Total</b-form-select-option>
                       <b-form-select-option v-for="(emotion, index) in getEmotions" :key="index" :value="emotion">{{emotion}}</b-form-select-option>
                    </b-form-select>
                </b-form-group>

                <div class="d-flex flex-row justify-content-end"><b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>
                <div v-if="warning!=''" :style="{'background-color':'#C82333',color:'#fdfdf3','border-radius':'4px'}">
                   <p>{{warning}}</p>
                </div>
              </b-form>

         </div>
     </b-modal>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            warning:'',
            modalBadgeDo: '',

            newBadgeForm:{
              badgeName: "",
              badgeIMG: "",
              pointsNedded:0,
              badgeEmotion: "",
            },          
        }
    },

    computed: {
        ...mapGetters(["getLoggedUser","getEmotions","getBagdes","checkBadges"]),
    },

    methods: {
        ...mapMutations(["SET_NEW_BADGE"]),

        addNewBadge() {
            if (!this.checkBadges(this.newBadgeForm.badgeName)) {
                this.SET_NEW_BADGE(this.newBadgeForm)
                location.reload()
            } else {
                this.warning="Já existe um badge com esse nome!"
            }
        }
    },

}
</script>

<style>
  #backgroundManagerBadges {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>
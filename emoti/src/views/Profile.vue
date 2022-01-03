<template>
   <div id="backgroundProfile">
     <b-container class="col-11 pt-4">
        <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Dados Pessoais</h2>
        
        <div class="row col-12">
          <div class="col-2 d-flex flex-row justify-content-center align-items-center">
            <img src="../assets/Imagem 1.png" :style="{width:'220px'}" alt="">
          </div>
          <div class="col-5">
            <b-form>
              <b-form-group label="Nome:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Username:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Password:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
               <b-form-group label="Email:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Tipo de Utilizador:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-select v-model="selected" disabled></b-form-select>
              </b-form-group>
              
            </b-form>
          </div>
          <div class="col-7 d-flex flex-row justify-content-end" >
            <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-profile @click="whatModalDo='changekey'">Alterar Passsword</b-button>
          </div>

        </div>

         <b-modal id="modal-profile" centered hide-footer header-border-variant="0" header-class="color" body-class="color">

             <!--Formulário para alterar password-->
             <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="whatModalDo=='changekey'">
               <h4 :style="{color:'#e87461'}">Alterar Password</h4>

               <b-form>
                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Password Atual:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Nova Password:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Conf. Nova Password:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" required></b-form-input>
                 </b-form-group>
               </b-form>

               <div class="d-flex flex-row justify-content-end">
                  <b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Alterar</b-button>
               </div>
             </div>

             <!--Associar Criança-->
              <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="whatModalDo=='addkid'">
                <h4 :style="{color:'#e87461'}">Associar Criança</h4>

                <b-form>
                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Username (Criança):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input  id="input-sm" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="4" label-cols-lg="4" label-size="sm" label-align-sm="left" label="Password (Criança):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="password" id="input-sm" required></b-form-input>
                 </b-form-group>

                </b-form>

                <div class="d-flex flex-row justify-content-end">
                  <b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Associar</b-button>
                </div>

              </div>

              <!--Pedidos para associar-->
                <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center d-flex flex-column align-items-center" v-if="whatModalDo=='intoclass'">
                    <h4 :style="{color:'#e87461'}">Pedidos para associar</h4>

                     <table class="col-12 mt-3 ml-4 mr-4 mb-3 text-center">
                        <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                            <th class="p-1">Turma</th>
                            <th>Professor</th>
                            <th>Ações</th>
                        </tr>
                        <tr :style="{'border-bottom':'2px solid #707070'}" >
                            <td class="p-4">AA</td>
                            <td>João Soares Pereira de Amorim</td>
                            <td><b-button size="sm" style="background-color:#4DA1A9;border:none" class=" ml-2 mr-1"><span class="material-icons-round">done</span></b-button>
                            <b-button variant="danger" size="sm" style="border:none;" class=" ml-1 mr-2"><span class="material-icons-round">close</span></b-button></td>
                        </tr>
                     </table>




              </div>

           </b-modal>

           <!--Parte vivível para os pais-->
          <div class="row col-12 mt-5">
             <div class="col-6"><h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Dados da Criança</h2></div>
             <div class="col-6 d-flex flex-row justify-content-end"><b-button class="h-75" :style="{'background-color':'#e87461',border:'none',color:'#fdfdf3'}" @click="whatModalDo='addkid'" v-b-modal.modal-profile>Associar criança</b-button></div>

             <div class="col-2 d-flex flex-row justify-content-center align-items-start mt-5">
                <img src="../assets/Imagem 1.png" :style="{width:'220px'}" alt="">
             </div>
             <div class="col-5 mt-5">
              <b-form>
              <b-form-group label="Nome:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              
              <b-form-group label="Username:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              
              <b-form-group label="Password:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
             
              </b-form-group>
               <b-form-group label="Email:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              
              <b-form-group label="Tipo de Utilizador:" label-for="nested-street" label-cols-sm="4" label-align-sm="left">
                <b-form-select v-model="selected" disabled></b-form-select>
              </b-form-group>

              </b-form>
            </div>
            <div class="col-5"></div>

            <div class="col-2"></div>

            <div class="col-10 d-flex flex-row justify-content-between" >

              <label  label-cols-sm="4" label-align-sm="left">Turmas: </label>

              <table class="col-10 ml-2 mr-2 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Turma</th>
                      <th>Professor</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" >
                      <td class="p-4">AA</td>
                      <td>João Soares Pereira de Amorim</td>
                      <td><b-button variant="danger" ><b-icon icon="trash-fill"></b-icon> Anular</b-button></td>
                  </tr>
              </table>

            </div>

            <div class="col-12 mt-4 pb-5 d-flex flex-row justify-content-end" >
              <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-profile @click="whatModalDo='intoclass'" >Pedidos para Associar</b-button>
            </div>

          </div>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      whatModalDo:""
    };
  },
}
</script>

<style>
  #backgroundProfile {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat;

  }
</style>
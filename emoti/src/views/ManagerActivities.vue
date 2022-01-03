<template>
   <div id="backgroundManagerUser">
     <b-container class="col-11 pt-4">
         <div class="col-12" :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}"><h2>Gerir</h2></div>

         <div class="col-12 mt-4">
              <b-form inline>
                  <label class="mr-sm-2" for="filterTitle">Título: </label>
                  <b-form-input id="filterTitle" class="mb-2 mr-sm-5 mb-sm-0 col-3" :style="{'background-color':'#fdfdf3'}"></b-form-input>

                  <label class="mr-sm-2" for="filterLevel">Tipo: </label>
                  <b-form-select id="filterLevel" class="mb-2 mr-sm-5 mb-sm-0 col-2"  :style="{'background-color':'#fdfdf3'}"></b-form-select>

                   <label class="mr-sm-2" for="filterLevel">Dificuldade: </label>
                  <b-form-select id="filterLevel" class="mb-2 mr-sm-0 mb-sm-0 col-2"  :style="{'background-color':'#fdfdf3'}"></b-form-select>
             </b-form>
         </div>

         <div class="col-12 d-flex flex-row justify-content-end mt-5">
             <b-button :style="{color:'#fdfdf3','background-color':'#BFBFBF',border:'none'}" class="mr-3" v-b-modal.modalManagerActivity @click="modalActivityDo='manageremotion'">Gerir Emoções</b-button>
             <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modalManagerActivity @click="modalActivityDo='addactivity'">Adicionar</b-button>
         </div>

         <div class="col-12 mt-3">
              <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Título</th>
                      <th>Grau de Dificuldade</th>
                      <th>Imagem (Capa do Quiz)</th>
                      <th>Categoria</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" >
                      <td class="p-4">Qual é o meu nome?</td>
                      <td>Fácil</td>
                      <td>www.home.com/123</td>
                      <td>Reconhecimento</td>
                      <td><b-button style="border:none" variant="secondary" class=" ml-2 mr-1" v-b-modal.modalManagerActivity @click="modalActivityDo='editactivity'"><b-icon icon="pencil-fill"></b-icon></b-button><b-button style="border:none" variant="danger" class=" ml-2 mr-1"><b-icon icon="trash-fill"></b-icon></b-button></td>
                  </tr>
             </table>
         </div>
     </b-container>

      <b-modal size="lg" id="modalManagerActivity" centered hide-footer header-border-variant="0" header-class="color" body-class="color">
          <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalActivityDo=='addactivity'">
              <h4 :style="{color:'#e87461'}">Adicionar Atividade</h4>

              <b-form>
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Título:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Dificuldade:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required></b-form-select>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Categoria:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required></b-form-select>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Questão:" label-for="input-sm" class="mt-4 mb-4">
                    <div class="row">
                       <b-form-select id="input-sm" class="col-3 ml-3" required></b-form-select>
                       <b-form-input id="input-sm" class="col-4 ml-2" placeholder="Emoção" required></b-form-input>
                       <b-form-input id="input-sm" class="col-2 ml-2" placeholder="Pontos" required></b-form-input>
                       <b-button class="col-1 ml-2"><b-icon icon="plus-circle-fill"></b-icon></b-button>
                    </div>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Capa (IMG):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="url" id="input-sm" required></b-form-input>
                 </b-form-group>
                 
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Descrição:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-textarea v-model="text" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                 </b-form-group>
            
              </b-form>
              <div class="d-flex flex-row justify-content-end"><b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>

          </div>

          <!--Editar Atividade-->

          <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalActivityDo=='editactivity'">
              <h4 :style="{color:'#e87461'}">Editar Atividade</h4>

              <b-form>
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Título:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required></b-form-input>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Dificuldade:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required></b-form-select>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Categoria:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required></b-form-select>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Questão:" label-for="input-sm" class="mt-4 mb-4">
                    <div class="row">
                       <b-form-select id="input-sm" class="col-3 ml-3" required></b-form-select>
                       <b-form-input id="input-sm" class="col-4 ml-2" placeholder="Emoção" required></b-form-input>
                       <b-form-input id="input-sm" class="col-2 ml-2" placeholder="Pontos" required></b-form-input>
                       <b-button class="col-1 ml-2"><b-icon icon="plus-circle-fill"></b-icon></b-button>
                    </div>
                 </b-form-group>

                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Capa (IMG):" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input type="url" id="input-sm" required></b-form-input>
                 </b-form-group>
                 
                 <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Descrição:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-textarea v-model="text" placeholder="Enter something..." rows="3" max-rows="6"></b-form-textarea>
                 </b-form-group>
            
              </b-form>
              <div class="d-flex flex-row justify-content-end"><b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Editar</b-button></div>

          </div>

          <!--Gerir Emoções-->
              <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalActivityDo=='manageremotion'">
                  <h4 :style="{color:'#e87461'}">Emoções</h4>

                  <b-form>
                    <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Nome:" label-for="input-sm" class="mt-4 mb-4">
                        <b-form-input id="input-sm" required></b-form-input>
                    </b-form-group>

                      <div class="d-flex flex-row justify-content-end"><b-button type="submit" class="text-end" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>
                  </b-form>

                  <hr>

                  <table class="col-12 text-center">
                    <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Nome</th>
                      <th>Ação</th>
                    </tr>
                    <tr :style="{'border-bottom':'2px solid #707070'}" >
                      <td class="p-4">Qual é o meu nome?</td>
                      <td><b-button style="border:none" variant="danger" class=" ml-2 mr-1"><b-icon icon="trash-fill"></b-icon></b-button></td>
                    </tr>
                  </table>



              </div>
    </b-modal> 
  </div>
</template>

<script>

export default {
  data() {
    return {
      modalActivityDo: ''
    }
  },
};
</script>

<style>
  #backgroundManagerUser {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>
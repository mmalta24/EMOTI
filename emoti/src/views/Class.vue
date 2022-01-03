<template>
   <div id="backgroundClass">
     <b-container class="col-11 pt-4">
       <div class="col-12 row">

         <div class="col-7" style="border-right:2px solid #BFBFBF">
           <div class="col-12 d-flex flex-row justify-content-between align-items-center">
              <h4 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Alunos</h4>
              <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-class @click="modalClassDo='addstudent'">Adicionar</b-button>
           </div>

           <div class="col-12 mt-5">
             <b-form inline>
                  <label class="mr-sm-2" for="filterTitle">Nome: </label>
                  <b-form-input id="filterTitle" class="mb-2 mr-sm-5 mb-sm-0 col-5" :style="{'background-color':'#fdfdf3'}"></b-form-input>

                  <label class="mr-sm-2" for="filterLevel">Turma: </label>
                  <b-form-select id="filterLevel" class="mb-2 mr-sm-0 mb-sm-0 col-3"  :style="{'background-color':'#fdfdf3'}"></b-form-select>
             </b-form>
           </div>

           <div class="col-12 mt-5">
                <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Username</th>
                      <th>Nome</th>
                      <th>Turma</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" >
                      <td class="p-4">joao123</td>
                      <td>João Soares Pereira de Amorim</td>
                      <td>AA</td>
                      <td><b-button style="border:none" class=" ml-2 mr-1" v-b-modal.modal-class @click="modalClassDo='editstudent'"><b-icon icon="pencil-fill"></b-icon></b-button><b-button style="border:none" variant="danger" class=" ml-2 mr-1"><b-icon icon="trash-fill"></b-icon></b-button></td>
                  </tr>
                </table>
           </div>

         </div>
         <div class="col-5">
           <div class="col-12 d-flex flex-row justify-content-between align-items-center">
              <h4 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Turmas</h4>
              <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-class @click="modalClassDo='addclass'">Adicionar</b-button>
           </div>

           <div class="col-12 mt-5">
              <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">ID</th>
                      <th>Nome</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" >
                      <td class="p-4">01</td>
                      <td>AA</td>
                      <td><b-button style="border:none" variant="danger" class=" ml-2 mr-1"><b-icon icon="trash-fill"></b-icon></b-button></td>
                  </tr>
                </table>
           </div>
         </div>
       </div>
     </b-container>

      <b-modal id="modal-class" centered hide-footer header-border-variant="0" header-class="color" body-class="color" scrollable>
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalClassDo=='addstudent'">
          <h4 :style="{color:'#e87461'}">Novo Aluno</h4>

          <b-form>
             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Username:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Nome:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Tutor:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Turma:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required ></b-form-select>
             </b-form-group>

          </b-form>

          <div class="d-flex flex-row justify-content-end"><b-button type="submit" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>
     
        </div>

        <!--Editar Aluno-->
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalClassDo=='editstudent'">
          <h4 :style="{color:'#e87461'}">Editar Aluno</h4>

          <b-form>
             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Username:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Nome:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Tutor:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required disabled></b-form-input>
             </b-form-group>

             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Turma:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-select id="input-sm" required ></b-form-select>
             </b-form-group>

          </b-form>

          <div class="d-flex flex-row justify-content-end"><b-button type="submit" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Alterar</b-button></div>
     
        </div>

        <!--Adicionar estudante-->
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if="modalClassDo=='addclass'">
           <h4 :style="{color:'#e87461'}">Adicionar Turma</h4>

           <b-form>
             <b-form-group label-cols="3" label-cols-lg="3" label-size="sm" label-align-sm="left" label="Nome:" label-for="input-sm" class="mt-4 mb-4">
                    <b-form-input id="input-sm" required ></b-form-input>
             </b-form-group>
           </b-form>

           <div class="d-flex flex-row justify-content-end"><b-button type="submit" :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}">Adicionar</b-button></div>
        </div>
      </b-modal>
  </div>
</template>

<script>

export default {
  data() {
    return {
      modalClassDo: ''
    }
  },
};
</script>

<style>
  #backgroundClass {
  width: 100%;
  min-height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
}
</style>
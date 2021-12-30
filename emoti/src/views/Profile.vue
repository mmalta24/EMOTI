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
              <b-form-group label="Nome:" label-for="nested-street" label-cols-sm="3" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Username:" label-for="nested-street" label-cols-sm="3" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Password:" label-for="nested-street" label-cols-sm="3" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
               <b-form-group label="Email:" label-for="nested-street" label-cols-sm="3" label-align-sm="left">
                <b-form-input id="nested-street" disabled></b-form-input>
              </b-form-group>
              <b-form-group label="Categoria:" label-for="nested-street" label-cols-sm="3" label-align-sm="left">
                <b-form-select v-model="selected" disabled></b-form-select>
              </b-form-group>
              
            </b-form>
          </div>
          <div class="col-7 d-flex flex-row justify-content-end" >
            <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modal-profile>Alterar Passsword</b-button>
          </div>

        </div>

         <b-modal id="modal-profile" centered hide-footer header-border-variant="0" header-class="color" body-class="color">

             <!--Formulário para alterar password-->
             <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center">
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
           </b-modal>

           <!--Parte vivível para os pais-->
           <div class="row col-12 mt-5 mb-4">
             <div class="col-12 d-flex flex-row justify-content-between">
                  <h2 :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}">Quiz</h2>
       <b-button  :style="{height:'100%','background-color':'#e87461',border:'none',color:'#fbfbf3'}" v-b-toggle.sidebar-right><b-icon icon="filter"></b-icon> Filtrar</b-button>
     </div>

           </div>
    </b-container>
  </div>
</template>

<script>

</script>

<style>
  #backgroundProfile {
  width: 100%;
  height: 100vh;
  background: url("../assets/Grupo 6.svg");
  background-size: 1525px auto;
  background-repeat: repeat;
}
</style>
<template>
   <div id="backgroundManagerUser">
     <b-container class="col-11 pt-4">
         <div class="col-12" :style="{color:'#e87461',fontFamily:'EAmbit SemiBold'}"><h2>Gerir</h2></div>

         <div class="col-12 mt-4">
              <b-form inline>
                  <label class="mr-sm-2" for="filterTitle">Nome: </label>
                  <b-form-input id="filterTitle" class="mb-2 mr-sm-5 mb-sm-0 col-3" :style="{'background-color':'#fdfdf3'}"></b-form-input>

                  <label class="mr-sm-2" for="filterLevel">Tipo: </label>
                  <b-form-select id="filterLevel" class="mb-2 mr-sm-0 mb-sm-0 col-2"  :style="{'background-color':'#fdfdf3'}"></b-form-select>
             </b-form>
         </div>

         <div class="col-12 d-flex flex-row justify-content-end mt-4">
             <b-button :style="{color:'#fdfdf3','background-color':'#e87461',border:'none'}" v-b-modal.modalManagerUser @click="modalUserDo='adduser'">Adicionar</b-button>
         </div>

         <div class="col-12 mt-2">
              <table class="col-12 text-center">
                  <tr :style="{'background-color':'#e87461',color:'#fbfbf3'}">
                      <th class="p-1">Username</th>
                      <th>Nome</th>
                      <th>Password</th>
                      <th>Tipo de Utilizador</th>
                      <th>Ações</th>
                  </tr>
                  <tr :style="{'border-bottom':'2px solid #707070'}" >
                      <td class="p-4">user123</td>
                      <td>João Soares Pereira de Amorim</td>
                      <td>123456</td>
                      <td>Criança</td>
                      <td><b-button style="border:none" variant="secondary" class=" ml-2 mr-1" v-b-modal.modalManagerUser @click="modalUserDo='edituser'"><b-icon icon="pencil-fill"></b-icon></b-button><b-button style="border:none" variant="danger" class=" ml-2 mr-1"><b-icon icon="trash-fill"></b-icon></b-button></td>
                  </tr>
             </table>
         </div>
     </b-container>

      <b-modal id="modalManagerUser" centered hide-footer header-border-variant="0" header-class="color" body-class="color">
        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center"  v-if=" modalUserDo=='adduser'">
          <h4 :style="{color:'#e87461'}">Adicionar utilizador</h4>

          <b-form>
             <b-input-group class="mb-4 mt-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">badge</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Username" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password"  placeholder="Password" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password"  placeholder="Confirmar Password" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Nome" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">send</span>
              </b-input-group-prepend>
              <b-form-input type="email"  placeholder="Email" style="background-color: #fdfdf3" required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-5">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person_search</span>
              </b-input-group-prepend>
              <b-form-select required style="background-color: #fdfdf3">
                <b-form-select-option :value="null" disabled>Quem sou eu ?</b-form-select-option>
              </b-form-select>
            </b-input-group>

            <div class="d-flex flex-row justify-content-end">
              <b-button type="submit" style="background-color: #e87461; color: #fdfdf3; border: none" class="mb-2 w-25">Adicionar</b-button>
            </div>

          </b-form>
     
        </div>

        <div :style="{fontFamily:'EAmbit SemiBold'}" class="text-center" v-if=" modalUserDo=='edituser'">
          <h4 :style="{color:'#e87461'}">Editar utilizador</h4>

          <b-form>
             <b-input-group class="mb-4 mt-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">badge</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Username" style="background-color: #fdfdf3" disabled required></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">lock</span>
              </b-input-group-prepend>
              <b-form-input type="password"  placeholder="Password" style="background-color: #fdfdf3" disabled required></b-form-input>
            </b-input-group>


            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person</span>
              </b-input-group-prepend>
              <b-form-input  placeholder="Nome" style="background-color: #fdfdf3" required disabled></b-form-input>
            </b-input-group>

            <b-input-group class="mb-4">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">send</span>
              </b-input-group-prepend>
              <b-form-input type="email"  placeholder="Email" style="background-color: #fdfdf3" required disabled></b-form-input>
            </b-input-group>

            <b-input-group class="mb-5">
              <b-input-group-prepend is-text>
                <span class="material-icons-round">person_search</span>
              </b-input-group-prepend>
              <b-form-select required style="background-color: #fdfdf3">
                <b-form-select-option :value="null" disabled>Quem sou eu ?</b-form-select-option>
              </b-form-select>
            </b-input-group>

            <div class="d-flex flex-row justify-content-end">
                <b-button type="submit" style="background-color: #bfbfbf; color: #fdfdf3; border: none" class="mb-2 w-25 mr-4">Bloquear</b-button>
              <b-button type="submit" style="background-color: #e87461; color: #fdfdf3; border: none" class="mb-2 w-25">Aplicar</b-button>
            </div>

          </b-form>
        </div>
      </b-modal> 
  </div>
</template>

<script>

export default {
  data() {
    return {
      modalUserDo: ''
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
<template>
	<div class="team_item">
    <div class="row">
      <div class="col-2 avatar">
        <img id="avatar" src="data:image/jpeg;base64,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" alt="Avatar">
      </div>
      <div class="col-10 summary">
        <!--<router-link :to="{ path: `/teams/${team._id}`}"><h5>{{ team.teamName }}</h5></router-link>-->
        <router-link :to="{ name: 'teamDetails', params: { id: team._id }}"><h5>{{ team.teamName }}</h5></router-link>
        <ul class="d-flex details inner-2-tile">
          <li v-if="team.regions.length !== 0"><i class="fa fa-map-marker fa-fw"></i> {{ team.regions | displayListContent }}</li>
          <li v-if="team.languages.length !== 0"><i class="fa fa-globe fa-fw"></i> {{ team.languages | displayListContent }}</li>
          <li v-if="team.competitiveness.length !== 0"><i class="fa fa-trophy fa-fw"></i> {{ team.competitiveness }}</li>
          <li v-if="team.recruiting.length !== 0"><i class="fa fa-pie-chart fa-fw"></i> {{ team.recruiting | displayListContent }}</li>
          <li v-if="team.comms.length !== 0"><i class="fa fa-microphone fa-fw"></i> {{ team.comms | displayListContent }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['team']
}
</script>

<style scoped>

  a.btn {
    margin-left: 8px;
  }
  a.btn i {
    font-size: 1em;
  }
  #avatar {
    width: 100%;
    border: 3px solid #fff;
    border-radius: 5px;
  }

  a {
    cursor: pointer;
    color: white;
  }

  h5 {
    display: inline-block;
    margin-bottom: 15px;
  }

  a:hover h5{
    text-decoration: underline;
  }

  .details i {
    font-size: 1.2em;
    color: #ddd;
    margin-right: 4px;
  }

  ul.details {
    /* background: #222; */
    padding: 3px 5px;
    border-radius: 3px;
    flex-wrap: wrap;
  }
  .details li {
    padding: 2px 0;
    list-style-type: none;
    font-size: 0.9em;
    flex-basis: calc(48%);
  }

  .avatar {
    padding: 0;
  }

  .row {
    width: 100%;
    margin: 0;
  }

  .summary {
    padding-right: 0;
  }
</style>

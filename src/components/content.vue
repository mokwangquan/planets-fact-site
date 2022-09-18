<template>
  <div id="content">
    <el-row type="flex" justify="center" align="start">
      <el-col :span="14">
        <div class="img-wrapper">
          <img 
            class="planet-img"
            :src="planetUrl" 
            :alt="planet.value+' image'"
          />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="content-wrapper">
          <h1>{{ planet.label }}</h1>
          <br/>
          <p>{{ content }}</p>
          <div class="source">
            Source : 
            <a :href="planet.sourceUrl" target="_blank">
              {{ planet.source }}<i class="go-to-icon"/>
            </a>
          </div>
          

          <div class="button-wrapper">
            <el-button 
              :style="`background-color: ${ selectedContent === 'overview' ? planet.color : '' }`"
              @click="selectedContent = 'overview'"
            >
              <span class="number">01</span> <h4>OVERVIEW</h4>
            </el-button>

            <el-button 
              :style="`background-color: ${ selectedContent === 'internalStructure' ? planet.color : '' }`"
              @click="selectedContent = 'internalStructure'"
            >
              <span class="number">02</span> <h4>INTERNAL STRUCTURE</h4>
            </el-button>

            <el-button 
              :style="`background-color: ${ selectedContent === 'surfaceGeology' ? planet.color : '' }`"
              @click="selectedContent = 'surfaceGeology'"
            >
              <span class="number">03</span> <h4>SURFACE GEOLOGY</h4>
            </el-button>
          </div>
          
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { PLANETS } from "@/constants/index.js"

export default {
  name: "Content",
  props: {
    selectedItem: { type: String, required: true },
  },
  data() {
    return {
      selectedContent: 'overview',
    }
  },
  computed: {
    planet() {
      return PLANETS.find(el => el.value == this.selectedItem)
    },
    planetUrl() {
      return require(`@/assets/svgs/planet-${this.planet.value}.svg`)
    },
    content() {
      return this.planet[this.selectedContent]
    },
  }
}
</script>



<style lang="scss">
#content {
  >.el-row {
    margin-top: 5rem;
    height: fit-content;
  }
  .content-wrapper {
    margin-right: 15rem;
  }
  .img-wrapper {
    margin-top: 10%;
    height: 100%;
    >img {
      display: block;
      margin: auto;
    }
  }
  a {
    font-weight: bold;
    text-decoration: underline;
    .go-to-icon {
      height: 15px;
      width: 15px;
      background-size: 15px 15px;
      background-position: center;
      background-repeat: no-repeat;
      display: inline-block;
      background-image: url('../assets/svgs/icon-source.svg');
      position: relative;
      bottom: -3px;
      left: 5px;
    }
  }
  .source {
    margin: 2rem 0
  }
  .button-wrapper {
    .el-button {
      width: 100%;
      padding: 0.5rem;
      color: #FFFFFF;
      border-radius: 0;
      margin: 0.5rem 0;
      background-color: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      text-align: start;
      * {
        display: inline;
      }
      .number {
        float: left;
        margin: auto 20px;
        padding: 5px;
      }
      &:hover {
        background-color: #38384F;
      }
    }
  }

  
}
</style>
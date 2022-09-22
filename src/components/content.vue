<template>
  <div id="content">
    <el-row type="flex" justify="center" align="start">
      <el-col :span="14">
        <div class="img-wrapper">
          <el-image 
            class="planet-img"
            :src="planetUrl" 
            :alt="planet.value+' image'"
            fit="contain"
          />
          <el-image
            class="planet-geology-img"
            v-if="selectedContent === 'surfaceGeology'"
            :src="planetGeoUrl" 
            :alt="planet.value+' image_geology'"
            fit="contain"
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
    <el-row class="numeric-facts-row" type="flex" justify="center" align="start">
      <el-col>
        <div class="fact-box">
          <div class="title">ROTATION TIME</div>
          <h2 class="answer">{{ planet.rotationTime }}</h2>
        </div>
      </el-col>
      <el-col>
        <div class="fact-box">
          <div class="title">REVOLUTION TIME</div>
          <h2 class="answer">{{ planet.revolutionTime }}</h2>
        </div>
      </el-col>
      <el-col>
        <div class="fact-box">
          <div class="title">RADIUS</div>
          <h2 class="answer">{{ planet.radius }}</h2>
        </div>
      </el-col>
      <el-col>
        <div class="fact-box">
          <div class="title">AVERAGE TEMP.</div>
          <h2 class="answer">{{ planet.temp }}</h2>
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
      let additional = ""
      if (this.selectedContent == "internalStructure") additional = "-internal"
      
      return require(`@/assets/svgs/planet-${this.planet.value}${additional}.svg`)
    },
    planetGeoUrl() {
      return require(`@/assets/pngs/geology-${this.planet.value}.png`)
    },
    content() {
      return this.planet[this.selectedContent]
    },
  },
  watch: {
    selectedItem() {
      this.selectedContent = 'overview'
    }
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
    height: 100%;
    max-height: 35rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .planet-geology-img {
    position: absolute;
    top: 65%;
    left: calc(50% - 65px);
    width: 130px;
  }
  a {
    color: #838391;
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

  .numeric-facts-row {
    margin: 2rem 10rem;
    .fact-box {
      padding: 1rem;
      margin: auto 1rem;
      border: 1px solid rgba(255, 255, 255, 0.2);
      .title {
        color: #838391;
      }
    }
  }
}
</style>
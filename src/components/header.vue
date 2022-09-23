<template>
  <div id="header">
    <div>
      <el-row 
        :type="isTablet && !isMobile ? '' : 'flex'" 
        justify="space-around" 
        align="middle"
      >
        <el-col>
          <h2 class="header-title">THE PLANETS</h2>
        </el-col>
        <el-col v-if="!isMobile">
          <el-row 
            class="menu" 
            type="flex" 
            justify="space-around" 
            align="middle"
          >
            <el-col 
              v-for="el in PLANETS"
              :key="el.value"
              :class="{ selected: selectedItem === el.value }"
              @click.native="onSelect(el.value)"
            >
            <div class="selected-line" :style="`border-color: ${el.color}`">&nbsp;</div>
            <div class="label">{{ el.label }}</div>
            </el-col>
          </el-row>
        </el-col>
        <el-col v-else :span="2">
          <i class="hamburger" @click="menuOpen = !menuOpen"/>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      :visible.sync="menuOpen"
      fullscreen
      append-to-body
      :modal="false"
    >
      <el-row 
        type="flex" 
        justify="space-between" 
        align="middle"
        v-for="el in PLANETS"
        :key="el.value"
        @click.native="onSelect(el.value); menuOpen = false"
      >
        <div class="sphere" :style="`background-color: ${el.color}`">&nbsp;</div>
        <el-col :span="24">
          <h3 class="name">{{ el.label }}</h3>
        </el-col>
        <el-col :span="1">
          <i class="right-arrow"/>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { PLANETS } from "@/constants/index.js"

export default {
  name: "Header",
  props: {
    selectedItem: { type: String, required: true },
    isMobile: { type: Boolean, required: true },
    isTablet: { type: Boolean, required: true },
  },
  data() {
    return {
      PLANETS,
      menuOpen: false,
    }
  },
  methods: {
    onSelect(value) {
      this.$emit('on-select', value)
    }
  }
}
</script>

<style lang="scss">

#header {
  position: sticky;
  top: 0;
  z-index: 2;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  background-color: #070724;
  background-image: url('../assets/svgs/background-stars.svg');
  height: 5rem;
  >div {
    padding: 1rem 2rem;
  }

  .menu {
    >.el-col {
      cursor: pointer;
      width: fit-content;
      margin: auto 1rem;
      margin-bottom: 10px;
      .selected-line {
        position: relative;
        top: -16px;
      }
      .label {
        position: relative;
        top: -8px;
      }
      &.selected,
      &:hover {
        font-weight: bold;
        .selected-line {
          border-top: 3px solid;
        }
      }
    }
  }
}

.tablet #header {
  .header-title {
    text-align: center;
  }
  .menu {
    >.el-col {
      .selected-line {
        top: 15px;
      }
    }
  }
}

.mobile #header {
  >div {
    padding: 0.5rem 1rem;
    z-index: 1;
  }
  .hamburger {
    background-image: url('../assets/svgs/icon-hamburger.svg');
    height: 30px;
    width: 30px;
    background-size: 30px;
    background-position: center;
    background-repeat: no-repeat;
    display: inline-block;
    margin-top: 10px;
  }
}

.el-dialog__wrapper {
  padding: 0;
  top: auto !important;
  height: calc(92vh + 4px);
  width: 100vw;
  .el-dialog {
    background-color: #070724;
    background-image: url('../assets/svgs/background-stars.svg');
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      padding: 1rem;
      .el-row {
        padding: 1rem;
        .sphere {
          width: 28px;
          height: 24px;
          border-radius: 50%;
          margin-right: 1rem;
        }
        .name {
          color: white;
        }
        .right-arrow {
          background-image: url('../assets/svgs/icon-chevron.svg');
          height: 10px;
          width: 10px;
          background-size: 10px;
          background-position: center;
          background-repeat: no-repeat;
          display: inline-block;
        }
      }
    }
  }
}
</style>
<template>
  <div id="header">
    <div>
      <el-row 
        :type="isTablet ? '' : 'flex'" 
        justify="space-around" 
        align="middle"
      >
        <el-col>
          <h2 class="header-title">THE PLANETS</h2>
        </el-col>
        <el-col>
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
      </el-row>
    </div>
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
      PLANETS
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
// @import "@/assets/style/_variables.scss";

#header {
  position: sticky;
  top: 0;
  z-index: 2;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
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
        // TODO: improve ui dont jump
        // border-top: 2px solid transparent !important; // hide
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
</style>
<script>
export default {
  name: "MenuItem",
  functional: true,
  props: {
    icon: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
  render(h, context) {
    const { icon, title } = context.props;
    const vnodes = [];

    if (icon) {
      if (icon.includes("el-icon")) {
        vnodes.push(<i class={[icon, "sub-el-icon"]} />);
      } else {
        vnodes.push(<i class={[`icon-${icon}`, "iconfont"]} />);
      }
    }

    if (title) {
      vnodes.push(
        <span class="span" slot="title">
          {" "}
          {title}{" "}
        </span>
      );
    }
    return vnodes;
  },
};
</script>

<style lang="scss" scoped>
.submenu-title-noDropdown:hover,
.el-menu-item:hover {
  background-color: rgba(0, 0, 0, 0) !important;

  .span {
    color: #3083f2 !important;
    // color: #fff;
  }
}
</style><style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.svg-icon {
  margin-right: 10px;
}

.el-menu-item.is-active span {
  font-size: 14px !important;
  font-family: Microsoft YaHei, Microsoft YaHei-Bold;
  font-weight: 700;
  text-align: left;
  color: #ffffff;
}

.el-menu-item.is-active i {
  color: #ffffff;
}

.el-menu-item span {
  font-size: 14px !important;
}
</style>

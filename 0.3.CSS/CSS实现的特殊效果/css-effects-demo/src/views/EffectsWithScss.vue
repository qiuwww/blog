<template>
  <!-- 参考文章https://mp.weixin.qq.com/s/QT211A__ubdeBtMs24HmkQ -->
  <div class="effects">
    <div class="effect effect-1">
      <h2>交错动画</h2>
      <div class="loading">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>

    <div class="effect effect-2">
      <h2>用JS分割文本</h2>
      <p class="landIn">Ano hi watashitachi mada shiranai no Fushigi no monogatari desu.</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'EffectsWithScss',
  data() {
    return {};
  },

  props: {},

  mounted() {
    const landInTexts = document.querySelectorAll('.landIn');
    landInTexts.forEach(landInText => {
      const letters = landInText.textContent.split('');
      // eslint-disable-next-line no-param-reassign
      landInText.textContent = '';
      letters.forEach((letter, i) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        landInText.append(span);
      });
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
body {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #222;
}
h2 {
  text-align: left;
}

.effect {
  height: 200px;
}

.effect-1 {
  .loading {
    $colors: #7ef9ff, #89cff0, #4682b4, #0f52ba, #000080;
    display: flex;
    animation-delay: 1s;

    .dot {
      position: relative;
      width: 2em;
      height: 2em;
      margin: 0.8em;
      border-radius: 50%;

      &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background: inherit;
        border-radius: inherit;
        animation: wave 2s ease-out infinite;
      }

      @for $i from 1 through 5 {
        &:nth-child(#{$i}) {
          background: nth($colors, $i);

          &::before {
            animation-delay: $i * 0.2s;
          }
        }
      }
    }
    @keyframes wave {
      50%,
      75% {
        transform: scale(2.5);
      }

      80%,
      100% {
        opacity: 0;
      }
    }
  }
}

.effect-1 {
  @import url('https://fonts.googleapis.com/css?family=Lora:400,400i,700');

  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(16, 16, 16, 0.8), rgba(16, 16, 16, 0.8)),
    url(https://i.loli.net/2019/10/18/buDT4YS6zUMfHst.jpg);
  background-size: cover;
  p {
    margin: 0 9em;
    font-size: 2em;
    font-weight: 600;
  }

  .landIn {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.8;
    color: white;
    font-family: Lora, serif;
    white-space: pre;

    span {
      animation: landIn 0.8s ease-out both;
    }
  }

  @keyframes landIn {
    from {
      opacity: 0;
      transform: translateY(-20%);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>

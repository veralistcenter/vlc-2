export const createIntersectionObserverMixin = ({
  ref = "observeTarget",
  key = "inView",
  options = { threshold: 0 },
  once = true,
} = {}) => ({
  data() {
    return { [key]: false };
  },
  mounted() {
    this.$observeWhenVisible();
  },
  beforeDestroy() {
    this.$disconnectIntersectionObserver();
  },
  methods: {
    $observeWhenVisible() {
      this.$disconnectIntersectionObserver();

      this.$nextTick(() => {
        const el = this.$refs[ref];
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            this[key] = true;
            if (once) {
              this.$disconnectIntersectionObserver();
            }
          } else if (!once) {
            this[key] = false;
          }
        }, options);

        observer.observe(el);
        this._intersectionObserver = observer;
      });
    },
    $disconnectIntersectionObserver() {
      if (this._intersectionObserver) {
        this._intersectionObserver.disconnect();
        this._intersectionObserver = null;
      }
    },
  },
});

export default createIntersectionObserverMixin();

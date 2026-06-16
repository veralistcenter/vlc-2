export const createIntersectionObserverMixin = ({
  ref = "observeTarget",
  key = "inView",
  options = { threshold: 0.1 },
  once = true,
} = {}) => ({
  data() {
    return { [key]: false };
  },
  mounted() {
    const el = this.$refs[ref];
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this[key] = true;
        if (once) observer.disconnect();
      } else if (!once) {
        this[key] = false;
      }
    }, options);

    observer.observe(el);
    this._intersectionObserver = observer;
  },
  beforeDestroy() {
    if (this._intersectionObserver) {
      this._intersectionObserver.disconnect();
    }
  },
});

export default createIntersectionObserverMixin();

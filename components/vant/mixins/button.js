export const button = {
  props: {
    id: String,
    lang: {
      type: String,
      default: "en"
    },
    hoverClass: {
      type: String,
      default: ""
    },
    businessId: Number,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    ariaLabel: String
  }
};

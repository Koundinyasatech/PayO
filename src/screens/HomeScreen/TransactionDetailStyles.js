import { StyleSheet } from "react-native";

export default StyleSheet.create({

  container: {

    flex: 1,

    paddingHorizontal: 18,

    paddingTop: 40,

  },

  /* HEADER */

  header: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 25,

  },

  headerText: {

    color: "#fff",

    fontSize: 18,

    fontWeight: "600",

    marginLeft: 15,

  },

  /* SECTION */

  section: {

    marginBottom: 20,

  },

  smallLabel: {

    color: "#bbb",

    fontSize: 12,

    marginBottom: 8,

  },

  /* ROWS */

  row: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

  },

  userRow: {

    flexDirection: "row",

    alignItems: "center",

    flex: 1,

  },

  iconBox: {

    width: 30,

    height: 30,

    borderRadius: 15,

    backgroundColor: "#fff",

    alignItems: "center",

    justifyContent: "center",

  },

  name: {

    color: "#fff",

    fontSize: 16,

    marginLeft: 10,

    flexShrink: 1,

    fontWeight: "500",

  },

  amount: {

    color: "#fff",

    fontSize: 18,

    fontWeight: "bold",

  },

  payo: {

    fontSize: 12,

    color: "#bbb",

  },

  /* DIVIDER */

  divider: {

    height: 1,

    backgroundColor: "rgba(255,255,255,0.1)",

    marginVertical: 15,

  },

  /* PAYMENT DETAILS */

  paymentHeader: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 10,

  },

  paymentTitle: {

    color: "#ddd",

    fontSize: 14,

    marginLeft: 8,

    fontWeight: "500",

  },

  label: {

    color: "#aaa",

    fontSize: 12,

    marginTop: 10,

  },

  valueRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginTop: 4,

  },

  value: {

    color: "#fff",

    fontSize: 14,

    flex: 1,

    marginRight: 10,

  },

  /* ACTIONS */

  actionsRow: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 20,

    marginBottom: 20,

  },

  actionItem: {

    alignItems: "center",

    flex: 1,

  },

  circle: {

    width: 45,

    height: 45,

    borderRadius: 22.5,

    backgroundColor: "#fff",

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 6,

  },

  actionText: {

    color: "#fff",

    fontSize: 12,

    textAlign: "center",

  },

  /* OPTIONAL: RECEIPT CARD (for better screenshot UI) */

  receiptCard: {

    backgroundColor: "#1E1E2D",

    borderRadius: 16,

    padding: 16,

  },

});

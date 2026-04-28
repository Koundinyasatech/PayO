import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },

  section: {
    marginBottom: 18,
  },

  smallLabel: {
    color: "#ccc",
    fontSize: 13,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  payo: {
    color: "#22c55e",
    fontSize: 14,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginVertical: 18,
  },

  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  paymentTitle: {
    color: "#fff",
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },

  label: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 8,
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
    fontWeight: "500",
  },

  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingBottom: 120, // space for bottom tabs
  },

  actionItem: {
    alignItems: "center",
    width: "23%",
  },

  circle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  actionText: {
    color: "#ddd",
    fontSize: 11,
    textAlign: "center",
  },
});
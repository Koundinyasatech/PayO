import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 20,
    // paddingTop: 20,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 25,
  },

  label: {
    color: "#ddd",
    marginBottom: 8,
    marginTop: 10,
    fontSize: 13,
  },

  input: {
    borderWidth: 1,
    borderColor: "#7A5DB0",
    borderRadius: 14,
    padding: 16,
    color: "#fff",
    marginBottom: 10,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  infoText: {
    color: "#aaa",
    marginBottom: 10,
  },

  successText: {
    color: "#00FFAA",
    marginBottom: 10,
  },

  errorText: {
    color: "red",
    marginBottom: 10,
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7A5DB0",
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  amountInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 14,
    fontSize: 16,
  },

  token: {
    color: "#00FFAA",
    fontWeight: "600",
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  quickBtn: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  quickText: {
    color: "#000",
    fontWeight: "500",
  },

  balanceBox: {
    backgroundColor: "#7B3FE4",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  balanceText: {
    color: "#ddd",
  },

  balanceAmount: {
    color: "#fff",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#0AA84F",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
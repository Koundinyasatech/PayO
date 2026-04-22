import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  label: {
    color: "#ddd",
    marginBottom: 6,
    marginTop: 14,
    fontSize: 13,
  },

  input: {
    borderWidth: 1,
    borderColor: "#7A5DB0",
    borderRadius: 14,
    padding: 14,
    color: "#fff",
    marginBottom: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  infoText: {
    color: "#aaa",
    marginBottom: 8,
    fontSize: 12,
  },

  successText: {
    color: "#00FFAA",
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "500",
  },

  errorText: {
    color: "#FF4D4D",
    marginBottom: 8,
    fontSize: 12,
  },

  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#7A5DB0",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  amountInput: {
    flex: 1,
    color: "#fff",
    paddingVertical: 12,
    fontSize: 16,
  },

  token: {
    color: "#00FFAA",
    fontWeight: "600",
    fontSize: 14,
  },

  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 18,
  },

  quickBtn: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  quickText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 13,
  },

  /* 🔥 UPDATED BALANCE BOX */
  balanceBox: {
    backgroundColor: "#7B3FE4",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  balanceText: {
    color: "#ddd",
    fontSize: 12,
  },

  balanceAmount: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    minWidth: 120, // 🔥 prevents layout shift when "Loading..."
    textAlign: "right",
  },

  button: {
    backgroundColor: "#0AA84F",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
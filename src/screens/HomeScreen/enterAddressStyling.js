import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
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
    marginTop: 18,
    fontSize: 13,
  },

  input: {
    borderWidth: 1,
    marginBottom: 12,
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 14,
    color: "#fff",
    fontSize: 14,
    backgroundColor: "rgba(255,255,255,0.08)",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
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
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
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
    fontSize: 14,
  },

  /* ✅ QUICK BUTTONS (ONLY ONE TIME) */
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  quickBtn: {
    backgroundColor: "#E5E5E5",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    minWidth: 60,
    alignItems: "center",
  },

  quickText: {
    color: "#000",
    fontWeight: "500",
    fontSize: 13,
  },

  /* 🔥 BALANCE BOX */
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
    minWidth: 120,
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
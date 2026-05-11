import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 20,        // ✅ prevent top touch
    paddingBottom: 110,    // ✅ prevent bottom tab overlap
    // ❌ removed backgroundColor (use gradient in screen)
  },

  /* HEADER */
 headerRow: {
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
},

backBtn: {
  position: "absolute",
  left: 15,
},

back: {
  fontSize: 22,
  color: "#fff",
},

header: {
  fontSize: 18,
  fontWeight: "600",
  color: "#fff",
},

  /* CARD */
  card: {
    backgroundColor: '#6a1bb9',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },

  icon: {
    fontSize: 30,
    marginBottom: 10,
  },

  earn: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },

  desc: {
    color: '#ddd',
    textAlign: 'center',
  },

  /* REFERRAL CODE */
  codeBox: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderStyle: 'dashed',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  codeLabel: {
    color: '#ccc',
    marginBottom: 5,     // ✅ better spacing
  },

  code: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },

  /* BUTTONS */
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  btn: {
    backgroundColor: '#5e2bb8',
    padding: 12,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '500',   // ✅ slight readability improvement
  },

  /* STATS */
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  statBox: {
    backgroundColor: '#6a1bb9',
    padding: 20,
    borderRadius: 15,
    width: '48%',
    alignItems: 'center',
  },

  statValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  statValueGreen: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },

  statLabel: {
    color: '#ddd',
    fontSize: 12,
    marginTop: 4,      // ✅ spacing fix
  },

  /* INFO */
  info: {
    marginTop: 10,
  },

  infoTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },

  infoText: {
    color: '#ccc',
    marginBottom: 6,   // ✅ consistent spacing
    lineHeight: 18,    // ✅ readability
  },
});
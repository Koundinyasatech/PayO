import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,     // 🔥 increased for breathing space
    paddingTop: 20,            // 🔥 prevents top touch
    paddingBottom: 110,        // 🔥 prevents bottom tab overlap
  },

  /* HEADER */
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  back: {
    color: '#fff',
    fontSize: 22,
    marginRight: 12,          // 🔥 more spacing
  },

  header: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  /* FILTERS */
  filterRow: {
    flexDirection: 'row',
    marginBottom: 18,
    flexWrap: 'wrap',         // 🔥 prevents overflow on small screens
  },

  activeFilter: {
    backgroundColor: '#00a651',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 8,          // 🔥 spacing between rows
    fontSize: 12,
  },

  filter: {
    backgroundColor: '#5e2bb8',
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 8,
    fontSize: 12,
  },

  /* SECTION */
  section: {
    color: '#fff',
    marginTop: 18,
    marginBottom: 12,
    fontWeight: '600',
    fontSize: 13,
  },

  /* TRANSACTION ITEM */
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,         // 🔥 more spacing
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  avatar: {
    width: 40,                // 🔥 slightly bigger
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#3c3c3c',
  },

  name: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  time: {
    color: '#ccc',
    fontSize: 11,
    marginTop: 3,
  },

  right: {
    alignItems: 'flex-end',
  },

  amount: {
    fontWeight: '700',
    fontSize: 14,
  },

  positive: {
    color: '#00ff99',
  },

  negative: {
    color: '#ff4d4d',
  },

  status: {
    color: '#aaa',
    fontSize: 11,
    marginTop: 3,
  },
});
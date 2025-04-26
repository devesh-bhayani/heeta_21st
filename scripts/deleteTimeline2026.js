const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function delete2026() {
  const snapshot = await db.collection('timelineEvents').where('year', '==', 2026).get();
  if (snapshot.empty) {
    console.log('No 2026 event found.');
    return;
  }
  for (const doc of snapshot.docs) {
    await db.collection('timelineEvents').doc(doc.id).delete();
    console.log('Deleted timeline event for year 2026:', doc.id);
  }
}

delete2026().catch(console.error);

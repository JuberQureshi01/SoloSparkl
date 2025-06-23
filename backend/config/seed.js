// async function seed() {
//   try {
//     const admin = await User.findOne({ email: 'juber@gmail.com' });
//     if (!admin) throw new Error("Admin user not found");

//     const adminId = admin._id;
//     console.log(admin);
//     const quests = [
//       // Calm
//       {
//         title: "Morning Mindfulness",
//         description: "Start your day with 5 minutes of quiet breathing.",
//         tags: ["calm"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Focused Breathing",
//         description: "Try the 4-7-8 breathing technique.",
//         tags: ["calm"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Candle Meditation",
//         description: "Stare at a candle flame for 3 minutes.",
//         tags: ["calm"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Body Scan",
//         description: "Do a 10-minute body scan meditation.",
//         tags: ["calm"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Mindful Tea Drinking",
//         description: "Drink tea slowly, focusing on each sip.",
//         tags: ["calm"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Peaceful Music",
//         description: "Listen to soft instrumental music for 10 minutes.",
//         tags: ["calm"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Cloud Gazing",
//         description: "Lie down and watch the clouds go by.",
//         tags: ["calm"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Coloring Therapy",
//         description: "Spend time coloring a mandala or pattern.",
//         tags: ["calm"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Soothing Bath",
//         description: "Take a warm bath and relax your body.",
//         tags: ["calm"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Silence Break",
//         description: "Sit in total silence for 10 minutes.",
//         tags: ["calm"],
//         difficulty: "hard",
//         createdBy: adminId
//       },

//       // Reflection
//       {
//         title: "Daily Gratitude",
//         description: "Write 3 things you're thankful for today.",
//         tags: ["reflection"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Positive Moment",
//         description: "Recall one positive moment from the day.",
//         tags: ["reflection"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Journal Prompt",
//         description: "Respond to a meaningful journal prompt.",
//         tags: ["reflection"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Mistake Lesson",
//         description: "Write about a mistake and what you learned.",
//         tags: ["reflection"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Compliment Yourself",
//         description: "Write 3 compliments to yourself.",
//         tags: ["reflection"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Future You",
//         description: "Write a letter to your future self.",
//         tags: ["reflection"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Value Alignment",
//         description: "Reflect on whether your actions align with your values.",
//         tags: ["reflection"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Memory Lane",
//         description: "Recall a joyful childhood memory.",
//         tags: ["reflection"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Emotion Tracker",
//         description: "Track how your emotions changed today.",
//         tags: ["reflection"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Best Decision",
//         description: "Write about one great decision you made recently.",
//         tags: ["reflection"],
//         difficulty: "medium",
//         createdBy: adminId
//       },

//       // Outdoors
//       {
//         title: "10-Minute Walk",
//         description: "Take a short walk and observe your surroundings.",
//         tags: ["outdoors"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Tree Watch",
//         description: "Find a tree and observe it closely for 5 minutes.",
//         tags: ["outdoors"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Park Visit",
//         description: "Spend time at a nearby park.",
//         tags: ["outdoors"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Barefoot Walk",
//         description: "Walk barefoot on grass or sand mindfully.",
//         tags: ["outdoors"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Outdoor Photography",
//         description: "Take 3 pictures of beautiful things outside.",
//         tags: ["outdoors"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Stargazing",
//         description: "Spend 10 minutes observing the stars.",
//         tags: ["outdoors"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Sunrise Watch",
//         description: "Wake up early to watch the sunrise.",
//         tags: ["outdoors"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Mindful Biking",
//         description: "Go for a slow, thoughtful bike ride.",
//         tags: ["outdoors"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Picnic Time",
//         description: "Have a solo picnic with your favorite snacks.",
//         tags: ["outdoors"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Bird Listening",
//         description: "Sit quietly and try to identify bird sounds.",
//         tags: ["outdoors"],
//         difficulty: "medium",
//         createdBy: adminId
//       },

//       // Creativity
//       {
//         title: "Mood Sketch",
//         description: "Sketch how you're feeling right now.",
//         tags: ["creativity"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Poetry Prompt",
//         description: "Write a short poem about nature.",
//         tags: ["creativity"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Doodle Session",
//         description: "Doodle whatever comes to mind for 10 minutes.",
//         tags: ["creativity"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Paper Art",
//         description: "Create something using just paper and scissors.",
//         tags: ["creativity"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Music Mood",
//         description: "Create a 5-song playlist for your mood.",
//         tags: ["creativity"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Recycled Craft",
//         description: "Make something useful from waste material.",
//         tags: ["creativity"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Comic Strip",
//         description: "Draw a short comic of your day.",
//         tags: ["creativity"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Origami Practice",
//         description: "Fold an origami shape you’ve never tried.",
//         tags: ["creativity"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Story Starter",
//         description: "Write a 3-line short story based on a random word.",
//         tags: ["creativity"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Abstract Art",
//         description: "Paint or draw something abstract using colors only.",
//         tags: ["creativity"],
//         difficulty: "easy",
//         createdBy: adminId
//       },

//       // Social
//       {
//         title: "Compliment Someone",
//         description: "Give a genuine compliment to someone.",
//         tags: ["social"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Call a Friend",
//         description: "Talk to a friend and check in on them.",
//         tags: ["social"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Family Time",
//         description: "Spend at least 30 minutes with a family member.",
//         tags: ["social"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Help a Stranger",
//         description: "Offer help to someone you don’t know.",
//         tags: ["social"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Send a Message",
//         description: "Send a kind message to someone you haven't talked to in a while.",
//         tags: ["social"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Share a Meal",
//         description: "Eat a meal with someone without using your phone.",
//         tags: ["social"],
//         difficulty: "easy",
//         createdBy: adminId
//       },
//       {
//         title: "Write a Thank You Note",
//         description: "Thank someone with a short handwritten note or message.",
//         tags: ["social"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Talk to a Neighbor",
//         description: "Introduce yourself or check in with a neighbor.",
//         tags: ["social"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Small Group Hangout",
//         description: "Attend or organize a small social meetup.",
//         tags: ["social"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Smile at 5 People",
//         description: "Make eye contact and smile at 5 people today.",
//         tags: ["social"],
//         difficulty: "easy",
//         createdBy: adminId
//       },

//       // Challenge
//       {
//         title: "Cold Shower",
//         description: "Take a cold shower to build mental strength.",
//         tags: ["challenge"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Digital Detox",
//         description: "Stay off social media for 24 hours.",
//         tags: ["challenge"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Random Act of Kindness",
//         description: "Do something kind anonymously.",
//         tags: ["challenge"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Wake Up Early",
//         description: "Wake up at 5 AM and journal your thoughts.",
//         tags: ["challenge"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Long Walk",
//         description: "Take a walk for at least 60 minutes.",
//         tags: ["challenge"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "No Sugar Day",
//         description: "Avoid all forms of sugar for the day.",
//         tags: ["challenge"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "Push-up Challenge",
//         description: "Do 50 push-ups throughout the day.",
//         tags: ["challenge"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "New Skill Start",
//         description: "Begin learning a new skill and document it.",
//         tags: ["challenge"],
//         difficulty: "medium",
//         createdBy: adminId
//       },
//       {
//         title: "Cold Call",
//         description: "Reach out to someone you admire with a message.",
//         tags: ["challenge"],
//         difficulty: "hard",
//         createdBy: adminId
//       },
//       {
//         title: "One Hour Reading",
//         description: "Read non-stop for one full hour.",
//         tags: ["challenge"],
//         difficulty: "medium",
//         createdBy: adminId
//       }
//     ];

//     await Quest.insertMany(quests);
//     console.log("✅ All quests inserted successfully");
//     process.exit(0);
//   } catch (err) {
//     console.error("❌ Seeding failed:", err.message);
//     process.exit(1);
//   }
// }

// seed();
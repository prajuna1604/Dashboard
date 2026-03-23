import { X, Star} from "lucide-react";
import { useState, useEffect } from "react";

export default function TeamPage() {
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem("members");
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: 1,
          name: "pranshi Ghimire",
          role: "Frontend Developer",
          dept: "Engineering",
          avatar: "https://i.pravatar.cc/150?img=1",
          status: "online",
          description: "Passionate frontend developer who loves building responsive UI using React and Tailwind CSS.",
          rating: 4
        },
        {
          id: 2,
          name: "Sita Acharya",
          role: "UI/UX Designer",
          dept: "Design",
          avatar: "https://i.pravatar.cc/150?img=2",
          status: "offline",
          description: "Creative UI/UX designer with expertise in user-centered design and prototyping.",
          rating: 5
        },
        {
          id: 3,
          name: "Rajesh Sharma",
          role: "Backend Developer",
          dept: "Engineering",
          avatar: "https://i.pravatar.cc/150?img=3",
          status: "online",
          description: "Experienced backend developer specializing in Node.js and database optimization.",
          rating: 3
        },
        {
          id: 4,
          name: "Anisha Poudel",
          role: "Product Manager",
          dept: "Management",
          avatar: "https://i.pravatar.cc/150?img=4",
          status: "online",
          description: "Strategic product manager focused on delivering customer-centric solutions.",
          rating: 2
        },
        {
          id: 5,
          name: "Bikram Thapa",
          role: "DevOps Engineer",
          dept: "Engineering",
          avatar: "https://i.pravatar.cc/150?img=5",
          status: "offline",
          description: "DevOps specialist with strong skills in CI/CD pipelines and cloud infrastructure.",
          rating: 4
        },
        {
          id: 6,
          name: "Neha Mainali",
          role: "QA Tester",
          dept: "Quality",
          avatar: "https://i.pravatar.cc/150?img=6",
          status: "online",
          description: "Meticulous QA tester ensuring high-quality software delivery and bug-free releases.",
          rating: 1
        },
        {
          id: 7,
          name: "Deepak Rana",
          role: "Full Stack Developer",
          dept: "Engineering",
          avatar: "https://i.pravatar.cc/150?img=7",
          status: "offline",
          description: "Versatile full stack developer proficient in both frontend and backend technologies.",
          rating: 3
        },
        {
          id: 8,
          name: "Meera Karki",
          role: "Graphic Designer",
          dept: "Design",
          avatar: "https://i.pravatar.cc/150?img=8",
          status: "online",
          description: "Talented graphic designer creating visually stunning and impactful designs.",
          rating: 5
        },
        {
          id: 9,
          name: "Arjun Adhikari",
          role: "Senior Developer",
          dept: "Engineering",
          avatar: "https://i.pravatar.cc/150?img=9",
          status: "online",
          description: "Senior developer with 8+ years of experience in scalable system architecture.",
          rating: 3
        },
        {
          id: 10,
          name: "Sakshi Gupta",
          role: "Content Manager",
          dept: "Marketing",
          avatar: "https://i.pravatar.cc/150?img=10",
          status: "offline",
          description: "Creative content manager specializing in engaging and strategic content delivery.",
          rating: 4
        }
      ];
  });

  const [selected, setSelected] = useState(null);
  useEffect(() => {
    localStorage.setItem("members", JSON.stringify(members));
  }, [members]);

  // Upload Avatar
  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    const updated = members.map((m) =>
      m.id === id ? { ...m, avatar: imageUrl } : m
    );
    setMembers(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Team Members</h1>

      {/*GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3  gap-4">
        {members.map((m) => (
          <div key={m.id} onClick={() => setSelected(m)} className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-br hover:from-white hover:to-indigo-50 ">
            <div className="flex justify-between items-start">
              {/* Avatar + Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={m.avatar} alt={m.name} className="w-24 h-12 rounded-full object-cover border-2 border-white shadow" />

                  {/* Status Dot */}
                  <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${m.status === "online"
                    ? "bg-green-500"
                    : "bg-gray-400"
                    }`} />
                </div>

                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm text-gray-500">{m.role}</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">{m.description}</p>
                </div>
              </div>

              {/* Status Badge */}
              <span className={`text-xs px-2 py-1 rounded-full ${m.status === "online"
                ? "bg-green-100 text-green-600"
                : "bg-gray-100 text-gray-600"
                }`}>
                {m.status}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                  {star <= m.rating ? (
                    <Star size={18} className="fill-yellow-400 text-yellow-400" />) : (
                    <Star size={18} className="text-gray-400" />
                  )}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-3">{m.dept}</p>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-80 relative">
            <button onClick={() => setSelected(null)} className="absolute top-2 right-2">
              <X size={18} />
            </button>

            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div className="relative cursor-pointer">
                <img src={selected.avatar} alt={selected.name} className="w-20 h-20 rounded-full object-cover border-2 shadow"
                  onClick={() =>
                    document.getElementById("avatarInput").click()} />

                {/* Status Dot */}
                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${selected.status === "online"
                  ? "bg-green-500"
                  : "bg-gray-400"
                  }`} />
              </div>

              {/* Hidden Input */}
              <input id="avatarInput" type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, selected.id)} />
              <h2 className="mt-3 font-bold">{selected.name}</h2>
              <p className="text-sm text-gray-500">{selected.role}</p>
            </div>
            {/* Info */}
            <div className="mt-4 text-sm space-y-1">
              <p><strong>Department:</strong> {selected.dept}</p>
              <p><strong>Status:</strong> {selected.status}</p>
              <div>
                <p className="font-semibold mt-2">About</p>
                <p className="text-gray-500 text-sm">
                  {selected.description}
                </p>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}
"use client";
export default function ProfileCompletion({ completion }) {
  const isComplete = completion >= 80;
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div>
        <h3 className="text-sm font-medium text-gray-800">Profile Completion</h3>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">{completion}%</span>
          <span className="text-xs text-gray-500">{isComplete ? "✅ Ready for recommendations" : "📝 Complete for better matches"}</span>
        </div>
      </div>
      {!isComplete && (
        <a href="/profile" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">
          Complete Profile
        </a>
      )}
    </div>
  );
}


// components/main-components/DashboardFooter.tsx
export default function DashboardFooter() {
  return (
    <footer className="flex items-center justify-between text-sm text-gray-500 mt-10">
      <div className="flex items-center gap-4">
        <span>Copyright © 2024 JeanCredit</span>
        <a href="#" className="hover:text-gray-700">Privacy Policy</a>
        <a href="#" className="hover:text-gray-700">Terms and Conditions</a>
        <a href="#" className="hover:text-gray-700">Contact</a>
      </div>
      <div className="flex items-center gap-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-6 h-6 bg-gray-300 rounded-full"></div>
        ))}
      </div>
    </footer>
  );
}

import { useState, lazy, Suspense } from "react";
import { Wrench } from "lucide-react";

const BehindTheScenesModal = lazy(() =>
  import("./BehindTheScenesModal").then((module) => ({
    default: module.BehindTheScenesModal,
  }))
);

export default function BehindTheScenesButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg"
      >
        <Wrench size={22} />
      </button>

      {open && (
        <Suspense fallback={null}>
          <BehindTheScenesModal isOpen={open} onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
}

import { ChevronRight, FileText } from "lucide-react"
import clsx from "clsx"

/**
 * Reusable empty state with a cluster of floating file icons (stone + white only).
 *
 * @param {object} props
 * @param {import("lucide-react").LucideIcon} [props.icon] Main icon in the center tile. Defaults to FileText.
 * @param {string} [props.title] Main text shown below the icons.
 * @param {string} [props.description] Subtext shown below the title.
 * @param {React.ReactNode} [props.action] Optional CTA (e.g. a button) rendered below the text.
 * @param {string} [props.className] Extra classes for the outer container.
 */
const EmptyState = ({ icon: Icon = FileText, title, description, action, actionName, className }) => {
  return (
    <div
      className={clsx(
        "w-full h-full bg-white flex flex-col justify-center items-center gap-3 p-6",
        className
      )}
    >
      {/* Icon cluster: dark focal tile in the center, lighter file icons floating around it */}
      <div className="relative w-36 h-36 mb-1">
        {/* Farther ring (lighter, more transparent) */}
        <div className="absolute top-1 left-2 w-8 h-8 rounded-lg bg-stone-100 text-stone-400 opacity-40 flex items-center justify-center">
          <FileText size={15} />
        </div>
        <div className="absolute top-3 right-1 w-9 h-9 rounded-lg bg-stone-100 text-stone-400 opacity-40 flex items-center justify-center">
          <FileText size={16} />
        </div>
        <div className="absolute bottom-2 left-0 w-7 h-7 rounded-lg bg-stone-100 text-stone-400 opacity-60 flex items-center justify-center">
          <FileText size={13} />
        </div>

        {/* Nearer ring (a touch darker) */}
        <div className="absolute top-12 left-6 w-8 h-8 rounded-lg bg-stone-200 text-stone-500 flex items-center justify-center">
          <FileText size={15} />
        </div>
        <div className="absolute top-10 right-6 w-7 h-7 rounded-lg bg-stone-200 text-stone-500 flex items-center justify-center">
          <FileText size={13} />
        </div>
        <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-stone-200 text-stone-500 flex items-center justify-center">
          <FileText size={15} />
        </div>

        {/* Center focal tile */}
        <div className="absolute inset-0 m-auto w-14 h-14 rounded-xl bg-stone-800 text-white shadow-lg shadow-stone-200 flex items-center justify-center">
          <Icon size={24} />
        </div>
      </div>

      {/* Text */}
      <div className="text-center max-w-72">
        {title && <h1 className="text-sm font-semibold text-stone-800">{title}</h1>}
        {description && <p className="text-xs text-stone-400 mt-1">{description}</p>}
      </div>

      {/* Optional CTA */}
      {action && 
      <button className="mt-1 bg-stone-800 hover:bg-stone-900 transition rounded-xl px-4 py-2 justify-center items-center flex" onClick={action}>
        <ChevronRight size={15} className="text-white"/>
        <h1 className="text-xs text-white">{actionName}</h1>
        </button>}
    </div>
  )
}

export default EmptyState


import { ArrowLeft, Plus } from "lucide-react"
import { categories } from "../mockdata"
const inputClassName =
    "mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-xs text-stone-800 outline-none transition placeholder:text-stone-400"

const InventoryModal = ({ onClose }) => {
    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 p-4 backdrop-blur-sm">
            <div className="flex max-h-200 w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl">
                <header className="flex items-start justify-between border-b border-stone-200 px-5 py-4 sm:px-6">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-stone-500">Inventory</p>
                        <h1 id="inventory-modal-title" className="mt-1 text-base font-bold text-stone-900">Add a new book</h1>
                        <p className="mt-1 text-xs text-stone-500">Enter the book details to add it to the inventory.</p>
                    </div>
                    <button type="button" onClick={onClose} className="rounded-lg p-2 text-stone-500 transition hover:bg-stone-100 hover:text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-300" aria-label="Close modal">
                        <ArrowLeft size={17} />
                    </button>
                </header>

                <div className="overflow-y-auto px-5 py-5 sm:px-6">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                        <label className="sm:col-span-2">
                            <span className="text-xs font-medium text-stone-700">Book title <span className="text-red-500">*</span></span>
                            <input type="text" name="title" placeholder="e.g. The Great Gatsby" className={inputClassName} required />
                        </label>
                        <label>
                            <span className="text-xs font-medium text-stone-700">Author <span className="text-red-500">*</span></span>
                            <input type="text" name="author" placeholder="Author name" className={inputClassName} required />
                        </label>
                        <label>
                            <span className="text-xs font-medium text-stone-700">Category <span className="text-red-500">*</span></span>
                            <select className={inputClassName} required>
                                {categories.map((category) => (
                                    <option key={category.value} value={category.value}>{category.label}</option>
                                ))}
                            </select>
                        </label>
                        <label className="sm:col-span-2">
                            <span className="text-xs font-medium text-stone-700">ISBN</span>
                            <input type="text" name="isbn" placeholder="e.g. 978-0-123456-78-9" className={inputClassName} />
                        </label>
                        <label>
                            <span className="text-xs font-medium text-stone-700">Edition</span>
                            <input type="text" name="edition" placeholder="e.g. 2nd edition" className={inputClassName} />
                        </label>
                        <label>
                            <span className="text-xs font-medium text-stone-700">Volume</span>
                            <input type="text" name="volume" placeholder="e.g. Volume 1" className={inputClassName} />
                        </label>
                        <label>
                            <span className="text-xs font-medium text-stone-700">Arrival date</span>
                            <input type="date" name="arrivalDate" className={inputClassName} />
                        </label>
                        <label>
                            <span className="text-xs font-medium text-stone-700">Source / donor</span>
                            <input type="text" name="source" placeholder="Where the book came from" className={inputClassName} />
                        </label>
                    </div>
                </div>

                <footer className="flex flex-col-reverse gap-2 border-t border-stone-200 bg-stone-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                    <button type="button" onClick={onClose} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-medium text-stone-700 transition hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-300">
                        Cancel
                    </button>
                    <button type="submit" className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-stone-800 px-3.5 py-2.5 text-xs font-medium text-white transition hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2">
                        <Plus size={15} />
                        Add book
                    </button>
                </footer>
            </div>
        </section>
    )
}

export default InventoryModal

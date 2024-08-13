import PriorityBadge from "./PriorityBadge"

type AiSuggestionProps = {
  suggestion: {
    priority: string
    description: string
  }
  onSave: (suggestion: any) => void
}

const AiSuggestionTip = ({ suggestion, onSave }: AiSuggestionProps) => (
  <div className="bg-white text-gray-800 rounded-lg shadow-lg p-4 max-w-sm">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-bold">Suggestion</h3>
      <PriorityBadge priority={suggestion.priority} />
    </div>
    <p className="text-sm mb-4">{suggestion.description}</p>
    <button
      onClick={() => onSave(suggestion)}
      className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200"
    >
      Add To Backlog
    </button>
  </div>
)

export default AiSuggestionTip

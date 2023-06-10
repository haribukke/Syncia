import { getStoredPrompts } from './getStoredPrompts'

/**
 * Find a prompt by its id. It uses depth-first search to get the
 * first prompt with the given id.
 */
export const findPrompt = (id: string) => {
  const prompts = getStoredPrompts()

  const find = (prompts: any): any => {
    for (const prompt of prompts) {
      if (prompt.id === id) {
        return prompt
      } else if (prompt.children) {
        const found = find(prompt.children)
        if (found) {
          return found
        }
      }
    }
  }

  return find(prompts)
}

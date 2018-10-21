export default function(key: string) {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const state = this.state
    state.inputs[key] = e.target.value
    this.setState(state)
  }
}

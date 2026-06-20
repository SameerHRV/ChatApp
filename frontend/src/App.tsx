import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const App = () => {
  return (
    <div>
      <header>
        <Show when="signed-out">
          <SignInButton />
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
    </div>
  );
};

export default App;

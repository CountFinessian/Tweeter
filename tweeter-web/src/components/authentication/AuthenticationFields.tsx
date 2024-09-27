interface Props {
    onSomeAction: (param: React.KeyboardEvent<HTMLElement>) => void;
    setPassword: React.Dispatch<React.SetStateAction<string>>
    password: string;
    setAlias: React.Dispatch<React.SetStateAction<string>>
    alias: string;
  }

  const AuthenticationFields: React.FC<Props> = ({ 
    onSomeAction,
    setPassword,
    password,
    setAlias,
    alias,
    }) => {
    
    return (
        <>
        <div className="form-floating">
            <input
                type="text"
                className="form-control"
                size={50}
                id="aliasInput"

                placeholder="name@example.com"
                onKeyDown={onSomeAction}
                onChange={(event) => setAlias(event.target.value)} />
            <label htmlFor="aliasInput">Alias</label>
        </div><div className="form-floating mb-3">
                <input
                    type="password"
                    className="form-control bottom"
                    id="passwordInput"
                    placeholder="Password"
                    onKeyDown={onSomeAction}
                    onChange={(event) => setPassword(event.target.value)} />
                <label htmlFor="passwordInput">Password</label>
            </div>
            </>
      );
  };

  export default AuthenticationFields;
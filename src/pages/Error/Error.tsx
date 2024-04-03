import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {isRouteErrorResponse(error) && (
        <p>
          Error status: <i>{error.statusText || error.data.message}</i>
        </p>
      )}
    </div>
  );
}

export default ErrorPage;

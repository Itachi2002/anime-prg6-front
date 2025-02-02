import React from 'react';

function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600">Pagina niet gevonden</p>
        <p className="text-gray-500">De pagina die je zoekt bestaat niet.</p>
      </div>
    </div>
  );
}

export default NotFound; 
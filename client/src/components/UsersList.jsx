import React from "react";

export default function UsersList({ users = [] }) {
	if (users.length === 0) {
		return <p className="text-gray-500">No users found yet.</p>;
	}

	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{users.map((u) => (
				<div key={u._id} className="p-4 border rounded-lg bg-white shadow-sm">
					<div className="flex justify-between items-start">
						<div>
							<h3 className="font-semibold text-gray-800">{u.name}</h3>
							<p className="text-sm text-gray-500">{u.email}</p>
						</div>
						<div className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleString()}</div>
					</div>

					<div className="mt-3 text-sm text-gray-600">
						Role: <strong className="text-gray-800 capitalize">{u.role || "student"}</strong>
					</div>
				</div>
			))}
		</div>
	);
}

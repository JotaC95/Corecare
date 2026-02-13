export default function PlanDetailPage({ params }: { params: { id: string } }) {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Plan Details (ID: {params.id})</h1>
            <p>This page will allow editing the plan and viewing version history.</p>
            {/* TODO: Implement full CRUD for Plan */}
        </div>
    )
}

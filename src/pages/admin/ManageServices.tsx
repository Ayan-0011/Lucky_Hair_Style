import { useState } from "react";
import { useServices, useCreateService, useUpdateService, useDeleteService, type Service } from "@/hooks/use-services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

const empty = { name: "", price: 0, duration: 30, description: "", active: true };

const ManageServices = () => {
  const { data: services = [], isLoading } = useServices();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [editing, setEditing] = useState<Service | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(empty);

  const handleSave = async () => {
    if (!form.name.trim()) return;
    if (editing) {
      await updateService.mutateAsync({ id: editing.id, ...form });
    } else {
      await createService.mutateAsync(form);
    }
    setEditing(null);
    setAdding(false);
    setForm(empty);
  };

  const handleDelete = (id: string) => deleteService.mutate(id);

  const toggleActive = (s: Service) => {
    updateService.mutate({ id: s.id, active: !s.active });
  };

  const startEdit = (s: Service) => {
    setEditing(s);
    setAdding(false);
    setForm({ name: s.name, price: s.price, duration: s.duration, description: s.description, active: s.active });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        {!adding && !editing && (
          <Button onClick={() => { setAdding(true); setForm(empty); }} className="gap-1">
            <Plus className="h-4 w-4" /> Add Service
          </Button>
        )}
      </div>

      {(adding || editing) && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">{editing ? "Edit Service" : "New Service"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Description</label>
                <Input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Price (₹)</label>
                <Input type="number" value={form.price} onChange={e => setForm({ ...form, price: +e.target.value })} />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Duration (min)</label>
                <Input type="number" value={form.duration} onChange={e => setForm({ ...form, duration: +e.target.value })} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} disabled={createService.isPending || updateService.isPending} className="gap-1">
                <Save className="h-4 w-4" /> Save
              </Button>
              <Button variant="outline" onClick={() => { setEditing(null); setAdding(false); setForm(empty); }} className="gap-1">
                <X className="h-4 w-4" /> Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="text-center text-muted-foreground py-8">Loading services...</div>
      ) : (
        <div className="grid gap-3">
          {services.map(s => (
            <div key={s.id} className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <p className={`font-semibold ${!s.active ? "text-muted-foreground line-through" : ""}`}>{s.name}</p>
                <p className="text-sm text-muted-foreground font-body">{s.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">₹{s.price}</span>
                <span className="text-xs text-muted-foreground">{s.duration}m</span>
                <Switch checked={s.active} onCheckedChange={() => toggleActive(s)} />
                <Button size="sm" variant="ghost" onClick={() => startEdit(s)}><Pencil className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(s.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageServices;

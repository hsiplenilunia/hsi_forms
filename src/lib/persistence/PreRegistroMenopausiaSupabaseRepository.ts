import type { SupabaseClient } from '@supabase/supabase-js';

export class PreRegistroMenopausiaSupabaseRepository {
    constructor(private supabaseClient: SupabaseClient<any, "public", any>) { }

    async createPreRegistro(data: any) {
        const { data: result, error } = await this.supabaseClient
            .from('hsi_nuevo_colaborador')
            .insert([data])
            .select();
        if (error) throw error;
        return result;
    }

    async newRetryCount(email: string, retryCount: number) {
        const { data, error } = await this.supabaseClient
            .from('hsi_nuevo_colaborador')
            .update({ re_try_count: retryCount + 1 })
            .eq('correoElectronico', email)
            .select();
        if (error) throw error;
        return data;

    }
    async checkExistingEmail(email: string) {
        const { data, error } = await this.supabaseClient
            .from('hsi_nuevo_colaborador')
            .select('*')
            .eq('correoElectronico', email);
        if (error) throw error;
        return data;
    }
}
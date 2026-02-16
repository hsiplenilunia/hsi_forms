import type { SupabaseClient } from '@supabase/supabase-js';

export class PreRegistroMenopausiaSupabaseRepository {
    constructor(private supabaseClient: SupabaseClient<any, "public", any>) { }

    async createPreRegistro(data: any) {
        const { data: result, error } = await this.supabaseClient
            .from('pre_registro_menopausia')
            .insert([data])
            .select();
        if (error) throw error;
        return result;
    }

    async newRetryCount(email: string, retryCount: number) {
        const { data, error } = await this.supabaseClient
            .from('pre_registro_menopausia')
            .update({ re_try_count: retryCount + 1 })
            .eq('correoElectronico', email)
            .select();
        if (error) throw error;
        return data;

    }
    async checkExistingEmail(email: string) {
        const { data, error } = await this.supabaseClient
            .from('pre_registro_menopausia')
            .select('*')
            .eq('correoElectronico', email);
        if (error) throw error;
        return data;
    }
}
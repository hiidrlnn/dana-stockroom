/**
 * Fetcher untuk SWR yang menangani autentikasi, pengecekan response, 
 * dan penanganan error yang lebih informatif.
 */
export const fetcher = async (url: string) => {
  const token = localStorage.getItem("token");

  // Opsi konfigurasi fetch dengan timeout sederhana (opsional, tapi disarankan)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // Timeout 10 detik

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": token ? `Bearer ${token}` : "",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // Jika response tidak OK
    if (!res.ok) {
      let errorMessage = `Error ${res.status}: Gagal mengambil data`;
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // Abaikan jika response bukan JSON
      }

      // Logika khusus untuk token kadaluwarsa (401)
      if (res.status === 401) {
        localStorage.removeItem("token");
        // Gunakan dispatch event atau cara lain untuk redirect agar tidak mengganggu SWR
        window.dispatchEvent(new Event("unauthorized")); 
        throw new Error("Sesi login berakhir. Silakan login kembali.");
      }

      throw new Error(errorMessage);
    }

    return await res.json();
    
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error("Koneksi ke server terlalu lama (Timeout).");
    }
    throw error;
  }
};
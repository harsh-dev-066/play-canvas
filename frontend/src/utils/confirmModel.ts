import Swal, { SweetAlertResult } from 'sweetalert2';

async function ConfirmMessage(text: string, title: string = 'Are you sure', type: 'warning' | 'success' | 'error' | 'info' | 'question' = 'warning'): Promise<SweetAlertResult> {
	const confirm: SweetAlertResult = await Swal.fire({
		title: title,
		text: text,
		icon: type,
		showConfirmButton: true,
		showCancelButton: true,
		confirmButtonColor: '#3B618B',
		confirmButtonText: 'Yes!',
	});
	return confirm;
}

export default ConfirmMessage;
